-- Migration: Failure Handling, Auto-Refunds, and Idempotent Retry Schema
-- Run this in your Supabase SQL Editor

-- 1. Add failure tracking and refund columns to generation_history
ALTER TABLE public.generation_history
ADD COLUMN IF NOT EXISTS error_message TEXT,
ADD COLUMN IF NOT EXISTS retry_count INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS refunded BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS refund_transaction_id TEXT;

-- 2. Create atomic & idempotent refund_generation_credits function
CREATE OR REPLACE FUNCTION public.refund_generation_credits(
  p_gen_id UUID,
  p_reason TEXT DEFAULT 'Automatic refund for failed video generation'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_gen record;
  v_balance_before INTEGER;
  v_balance_after INTEGER;
  v_tx_id UUID;
BEGIN
  -- Fetch generation record with row lock for safe concurrency
  SELECT * INTO v_gen 
  FROM public.generation_history 
  WHERE id = p_gen_id 
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'message', 'Generation record not found');
  END IF;

  -- Idempotency Check: Prevent double refunding
  IF v_gen.refunded THEN
    RETURN jsonb_build_object('success', true, 'message', 'Credits already refunded previously', 'already_refunded', true);
  END IF;

  -- Fetch current user wallet balance
  SELECT available_credits INTO v_balance_before
  FROM public.user_wallets
  WHERE user_id = v_gen.user_id
  FOR UPDATE;

  IF v_balance_before IS NULL THEN
    v_balance_before := 0;
  END IF;

  v_balance_after := v_balance_before + v_gen.credits_consumed;

  -- 1. Update wallet balance
  UPDATE public.user_wallets
  SET available_credits = v_balance_after,
      updated_at = timezone('utc'::text, now())
  WHERE user_id = v_gen.user_id;

  -- 2. Insert positive refund log entry in credit_transactions
  INSERT INTO public.credit_transactions (
    user_id,
    amount,
    balance_before,
    balance_after,
    type,
    description,
    reference_id,
    created_at
  ) VALUES (
    v_gen.user_id,
    v_gen.credits_consumed,
    v_balance_before,
    v_balance_after,
    'refund',
    COALESCE(p_reason, 'Refund for failed generation'),
    'refund_' || p_gen_id::text,
    timezone('utc'::text, now())
  ) RETURNING id INTO v_tx_id;

  -- 3. Mark generation record as FAILED and refunded = true
  UPDATE public.generation_history
  SET status = 'FAILED',
      refunded = true,
      refund_transaction_id = v_tx_id::text,
      updated_at = timezone('utc'::text, now())
  WHERE id = p_gen_id;

  RETURN jsonb_build_object(
    'success', true,
    'refunded_amount', v_gen.credits_consumed,
    'new_balance', v_balance_after
  );
END;
$$;
