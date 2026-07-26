import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pwtxdpgbggzgmscspepe.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHhkcGdiZ2d6Z21zY3NwZXBlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDk1NDE4MCwiZXhwIjoyMTAwNTMwMTgwfQ.VavXzgIXsO6e4XOdsuWPfuzM0wXx0ZkT_B30aHqNm88";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const PRODUCT_CREDIT_MAP: Record<string, { credits: number; planTier: string; isSubscription: boolean }> = {
  pdt_0NjxLVOe3nEY8sjRUHX2Y: { credits: 7, planTier: "starter", isSubscription: false },
  pdt_0NjxLVR4OKFIjgwVqLH9w: { credits: 18, planTier: "growth", isSubscription: true },
  pdt_0NjxLVSkfoUw6zbz1LPuj: { credits: 48, planTier: "business", isSubscription: true },
  pdt_0NjxLVTamfL0YIUl8hEZw: { credits: 6, planTier: "topup", isSubscription: false },
  pdt_0NjxLVUUg9GB4M4uaI1QN: { credits: 12, planTier: "topup", isSubscription: false },
  pdt_0NjxLVVLYM1wFfqj85Jt8: { credits: 24, planTier: "topup", isSubscription: false },
  pdt_0NjxLVWDCzQSPmiqnb6d7: { credits: 48, planTier: "topup", isSubscription: false },
  pdt_0NjxLVX6NbGgFun9fffNj: { credits: 96, planTier: "topup", isSubscription: false },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const eventType = body.type || body.event;
    const data = body.data || body;

    console.log(`[DODO WEBHOOK] Event: ${eventType}`, JSON.stringify(data).substring(0, 500));

    if (
      eventType === "payment.succeeded" ||
      eventType === "subscription.active" ||
      eventType === "subscription.renewed"
    ) {
      const metadataUserId = data.metadata?.user_id;
      const customerEmail = data.customer?.email || data.customer_email || data.metadata?.user_email;
      const productCart = data.product_cart || [];
      const productId = productCart[0]?.product_id || data.product_id;
      const paymentId = data.payment_id || data.id;

      const productConfig = PRODUCT_CREDIT_MAP[productId] || { credits: 10, planTier: "topup", isSubscription: false };
      const creditsToGrant = productConfig.credits;

      // --- Resolve user_id ---
      let userId: string | null = metadataUserId || null;

      if (!userId && customerEmail) {
        const { data: usersData } = await supabase.auth.admin.listUsers();
        const matchedUser = usersData?.users?.find((u) => u.email?.toLowerCase() === customerEmail.toLowerCase());
        if (matchedUser) {
          userId = matchedUser.id;
        } else if (usersData?.users && usersData.users.length > 0) {
          // Last resort: first user (for single-user setups)
          userId = usersData.users[0].id;
        }
      }

      if (!userId) {
        console.warn(`[DODO WEBHOOK] Could not resolve user. Email: ${customerEmail}, metadata.user_id: ${metadataUserId}`);
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // --- Idempotency check: skip if this payment was already processed ---
      const { data: existingTx } = await supabase
        .from("credit_transactions")
        .select("id")
        .eq("user_id", userId)
        .eq("reference_id", paymentId)
        .maybeSingle();

      if (existingTx) {
        console.log(`[DODO WEBHOOK] Payment ${paymentId} already processed for user ${userId}. Skipping.`);
        return NextResponse.json({ success: true, message: "Already processed", skipped: true });
      }

      // --- 1. Fetch current wallet ---
      const { data: wallet } = await supabase
        .from("user_wallets")
        .select("available_credits, plan_tier")
        .eq("user_id", userId)
        .maybeSingle();

      const balanceBefore = Number(wallet?.available_credits || 0);
      const balanceAfter = balanceBefore + creditsToGrant;
      const currentPlanTier = productConfig.isSubscription ? productConfig.planTier : (wallet?.plan_tier || "free");

      const now = new Date();
      const renewalDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

      // --- 2. Upsert credit wallet ---
      const walletPayload: Record<string, any> = {
        user_id: userId,
        available_credits: balanceAfter,
        plan_tier: currentPlanTier,
        updated_at: now.toISOString(),
      };
      if (productConfig.isSubscription) {
        walletPayload.next_renewal_date = renewalDate.toISOString();
      }
      await supabase.from("user_wallets").upsert(walletPayload);

      // --- 3. Insert immutable ledger entry ---
      await supabase.from("credit_transactions").insert({
        user_id: userId,
        amount: creditsToGrant,
        balance_before: balanceBefore,
        balance_after: balanceAfter,
        type: productConfig.isSubscription ? "grant" : "topup",
        description: `Dodo Payment Succeeded: +${creditsToGrant} Credits (${productConfig.planTier.toUpperCase()})`,
        reference_id: paymentId,
        created_at: now.toISOString(),
      });

      // --- 4. Upsert subscription if recurring ---
      if (productConfig.isSubscription) {
        await supabase.from("subscriptions").upsert({
          user_id: userId,
          plan_id: `${productConfig.planTier}_monthly`,
          status: "active",
          current_period_start: now.toISOString(),
          current_period_end: renewalDate.toISOString(),
          dodo_subscription_id: data.subscription_id || paymentId,
          updated_at: now.toISOString(),
        });
      }

      console.log(`[DODO WEBHOOK] ✅ Credited ${creditsToGrant} credits to user ${userId}. Balance: ${balanceBefore} → ${balanceAfter}. Plan: ${currentPlanTier}`);
      return NextResponse.json({ success: true, credited: creditsToGrant, balance_after: balanceAfter });
    }

    // Unhandled event type
    console.log(`[DODO WEBHOOK] Unhandled event type: ${eventType}`);
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("[DODO WEBHOOK] Error:", error);
    return NextResponse.json({ error: error.message || "Webhook processing failed" }, { status: 500 });
  }
}
