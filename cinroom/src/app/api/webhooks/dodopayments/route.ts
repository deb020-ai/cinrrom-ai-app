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

    console.log(`Received Dodo Webhook: ${eventType}`, JSON.stringify(data));

    if (
      eventType === "payment.succeeded" ||
      eventType === "subscription.active" ||
      eventType === "subscription.renewed"
    ) {
      const customerEmail = data.customer?.email || data.customer_email;
      const productCart = data.product_cart || [];
      const productId = productCart[0]?.product_id || data.product_id;
      const paymentId = data.payment_id || data.id;

      const productConfig = PRODUCT_CREDIT_MAP[productId] || { credits: 10, planTier: "topup", isSubscription: false };
      const creditsToGrant = productConfig.credits;

      if (customerEmail) {
        // Find user by email in Supabase Auth
        const { data: usersData } = await supabase.auth.admin.listUsers();
        const user = usersData?.users?.find((u) => u.email?.toLowerCase() === customerEmail.toLowerCase());

        if (user) {
          const userId = user.id;

          // 1. Get existing wallet
          const { data: wallet } = await supabase
            .from("user_wallets")
            .select("available_credits, plan_tier")
            .eq("user_id", userId)
            .single();

          const balanceBefore = Number(wallet?.available_credits || 0);
          const balanceAfter = balanceBefore + creditsToGrant;
          const currentPlanTier = productConfig.isSubscription ? productConfig.planTier : (wallet?.plan_tier || "free");

          const now = new Date();
          const renewalDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // +30 days

          // 2. Upsert credit wallet balance & plan tier
          await supabase.from("user_wallets").upsert({
            user_id: userId,
            available_credits: balanceAfter,
            plan_tier: currentPlanTier,
            next_renewal_date: productConfig.isSubscription ? renewalDate.toISOString() : undefined,
            updated_at: now.toISOString(),
          });

          // 3. Log credit transaction ledger entry
          await supabase.from("credit_transactions").insert({
            user_id: userId,
            amount: creditsToGrant,
            balance_before: balanceBefore,
            balance_after: balanceAfter,
            type: productConfig.isSubscription ? "grant" : "topup",
            description: `Dodo Payment: +${creditsToGrant} Credits (${productConfig.planTier.toUpperCase()})`,
            reference_id: paymentId,
            created_at: now.toISOString(),
          });

          // 4. Update Subscriptions table if recurring
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

          console.log(`Successfully credited ${creditsToGrant} credits to user ${userId} (${customerEmail})`);
        } else {
          console.warn(`User with email ${customerEmail} not found in Supabase Auth.`);
        }
      }

      return NextResponse.json({ success: true, credited: creditsToGrant });
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Dodo Webhook Error:", error);
    return NextResponse.json({ error: error.message || "Webhook processing failed" }, { status: 500 });
  }
}
