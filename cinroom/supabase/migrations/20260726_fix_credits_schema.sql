-- Migration to fix missing columns and constraints from the original schema
-- Run this in your Supabase SQL Editor

-- 1. Add missing columns to credit_transactions
ALTER TABLE public.credit_transactions 
ADD COLUMN IF NOT EXISTS balance_before INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS balance_after INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS reference_id TEXT,
ADD COLUMN IF NOT EXISTS invoice_url TEXT;

-- 2. Add UNIQUE constraint to reference_id to enforce idempotency at the database level!
-- This absolutely prevents double-crediting if two webhooks fire at the exact same millisecond.
ALTER TABLE public.credit_transactions
ADD CONSTRAINT credit_transactions_reference_id_key UNIQUE (reference_id);

-- 3. Add missing updated_at column to subscriptions
ALTER TABLE public.subscriptions
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;

-- 4. Add UNIQUE constraint to user_id on subscriptions
-- This is REQUIRED because the Next.js API uses `.upsert()` with `user_id`. 
-- Without this unique constraint, PostgreSQL will just insert duplicate rows instead of updating!
ALTER TABLE public.subscriptions
ADD CONSTRAINT subscriptions_user_id_key UNIQUE (user_id);
