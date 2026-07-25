import { createClient } from "@/lib/supabase/client";

/**
 * Cinroom Unified Credit Consumption Constants
 * 1 Commercial Video = 5 Credits
 * 1 Performance Creative (Image) = 1 Credit
 */
export const CREDIT_COSTS = {
  COMMERCIAL_VIDEO: 5,
  PERFORMANCE_CREATIVE: 1,
} as const;

export interface CreditTransaction {
  id: string;
  user_id: string;
  amount: number;
  type: "grant" | "deduction" | "topup" | "refund";
  description: string;
  created_at: string;
}

export interface UserCreditWallet {
  user_id: string;
  available_credits: number;
  credits_used: number;
  remaining_credits: number;
  next_renewal_date?: string;
  plan_tier: "free" | "starter" | "growth" | "business" | "enterprise";
}

/**
 * Deduct credits from user wallet
 */
export async function deductCredits(
  userId: string,
  assetType: "COMMERCIAL_VIDEO" | "PERFORMANCE_CREATIVE",
  description: string
): Promise<{ success: boolean; error?: string; remainingCredits?: number }> {
  const supabase = createClient();
  const cost = CREDIT_COSTS[assetType];

  try {
    // 1. Fetch current user wallet balance
    const { data: wallet, error: walletError } = await supabase
      .from("user_wallets")
      .select("available_credits, credits_used")
      .eq("user_id", userId)
      .single();

    if (walletError || !wallet) {
      return { success: false, error: "Credit wallet not initialized or insufficient credits." };
    }

    if (wallet.available_credits < cost) {
      return {
        success: false,
        error: `Insufficient credits. This operation requires ${cost} credits, but you have ${wallet.available_credits} available.`,
      };
    }

    const newAvailable = wallet.available_credits - cost;
    const newUsed = wallet.credits_used + cost;

    // 2. Update wallet balance
    const { error: updateError } = await supabase
      .from("user_wallets")
      .update({
        available_credits: newAvailable,
        credits_used: newUsed,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    // 3. Log transaction history
    await supabase.from("credit_transactions").insert({
      user_id: userId,
      amount: -cost,
      type: "deduction",
      description: `${description} (${cost} Credits)`,
      created_at: new Date().toISOString(),
    });

    return { success: true, remainingCredits: newAvailable };
  } catch (err: any) {
    console.error("Credit deduction error:", err);
    return { success: false, error: err.message || "Failed to process credit deduction." };
  }
}

/**
 * Add credits to user wallet (Top-Up or Subscription Renewal)
 */
export async function grantCredits(
  userId: string,
  amount: number,
  transactionType: "grant" | "topup",
  description: string
): Promise<{ success: boolean; newBalance?: number }> {
  const supabase = createClient();

  try {
    const { data: wallet } = await supabase
      .from("user_wallets")
      .select("available_credits")
      .eq("user_id", userId)
      .single();

    const currentBalance = wallet?.available_credits || 0;
    const newBalance = currentBalance + amount;

    await supabase.from("user_wallets").upsert({
      user_id: userId,
      available_credits: newBalance,
      updated_at: new Date().toISOString(),
    });

    await supabase.from("credit_transactions").insert({
      user_id: userId,
      amount: amount,
      type: transactionType,
      description: description,
      created_at: new Date().toISOString(),
    });

    return { success: true, newBalance };
  } catch (err: any) {
    console.error("Credit grant error:", err);
    return { success: false };
  }
}
