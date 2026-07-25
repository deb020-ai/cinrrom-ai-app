import { createClient } from "@/lib/supabase/client";

/**
 * Cinroom Credit Consumption Constants
 * 1 Commercial Video = 3 Credits
 * 1 Performance Creative (Image) = 0.2 Credits (5 Creatives = 1 Credit)
 */
export const CREDIT_COSTS = {
  COMMERCIAL_VIDEO: 3,
  PERFORMANCE_CREATIVE: 0.2,
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
  plan_tier: "starter" | "growth" | "business" | "enterprise";
}

/**
 * Deduct credits from user wallet (supports decimal credits accurately)
 */
export async function deductCredits(
  userId: string,
  assetType: "COMMERCIAL_VIDEO" | "PERFORMANCE_CREATIVE",
  description: string
): Promise<{ success: boolean; error?: string; remainingCredits?: number }> {
  const supabase = createClient();
  const cost = CREDIT_COSTS[assetType];

  try {
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

    const newAvailable = Number((wallet.available_credits - cost).toFixed(2));
    const newUsed = Number((wallet.credits_used + cost).toFixed(2));

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
 * Add credits to user wallet
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
    const newBalance = Number((currentBalance + amount).toFixed(2));

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
