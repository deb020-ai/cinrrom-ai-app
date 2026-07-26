import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import DodoPayments from "dodopayments";

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
    const rawBody = await req.text();
    
    // --- 1. Verify webhook signature ---
    const webhookSecret = process.env.DODO_WEBHOOK_SECRET;
    const apiKey = process.env.DODO_PAYMENTS_API_KEY || "P8N0k49snpihXwz0.nfVbvxkdNph6wvQeQfE0Z6XtajZLV1zSdtHxf2HlSyHiNd7a";
    const environment = apiKey.startsWith("test_") ? "test_mode" : "live_mode";
    
    const client = new DodoPayments({
      bearerToken: apiKey,
      environment: environment
    });

    const headersList = Object.fromEntries(req.headers.entries());

    let event: any;
    try {
      if (webhookSecret) {
        // unwrap() is SYNCHRONOUS — it verifies signature then JSON.parse()
        event = client.webhooks.unwrap(rawBody, {
          headers: headersList,
          key: webhookSecret
        });
      } else {
        console.warn("[DODO WEBHOOK] ⚠️ No DODO_WEBHOOK_SECRET set! Skipping verification.");
        event = JSON.parse(rawBody);
      }
    } catch (err: any) {
      console.error("[DODO WEBHOOK] ❌ Signature verification failed:", err.message);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const eventType: string = event.type;
    const data = event.data;

    console.log(`[DODO WEBHOOK] Event: ${eventType}`, JSON.stringify(data).substring(0, 500));

    // --- 2. Handle creditable events ---
    // payment.succeeded = one-time purchases (Starter, Top-ups)
    // subscription.active = first subscription activation (Growth, Business)
    // subscription.renewed = monthly recurring renewal
    // subscription.updated = plan changes (also fires on first activation sometimes)
    if (
      eventType === "payment.succeeded" ||
      eventType === "subscription.active" ||
      eventType === "subscription.renewed" ||
      eventType === "subscription.updated"
    ) {
      // --- 3. Extract fields based on event type ---
      // Dodo sends DIFFERENT data shapes for payments vs subscriptions!
      //
      // For payment.succeeded:
      //   data = Payment object → has product_cart[], payment_id, customer.email, metadata
      //
      // For subscription.active/renewed/updated:
      //   data = Subscription object → has product_id (TOP-LEVEL), subscription_id, customer.email, metadata

      let productId: string | undefined;
      let canonicalId: string | undefined;
      let customerEmail: string | undefined;
      let metadataUserId: string | undefined;

      if (eventType === "payment.succeeded") {
        // Payment event: product is inside product_cart array
        const productCart = data.product_cart || [];
        productId = productCart[0]?.product_id || data.product_id;
        canonicalId = data.payment_id || data.id;
        customerEmail = data.customer?.email;
        metadataUserId = data.metadata?.user_id;
      } else {
        // Subscription event: product_id is a TOP-LEVEL field on the Subscription object
        productId = data.product_id;
        canonicalId = data.subscription_id || data.id;
        customerEmail = data.customer?.email;
        metadataUserId = data.metadata?.user_id;
      }

      console.log(`[DODO WEBHOOK] Extracted → productId: ${productId}, canonicalId: ${canonicalId}, email: ${customerEmail}, metadataUserId: ${metadataUserId}`);

      // --- 4. Validate product ---
      const productConfig = productId ? PRODUCT_CREDIT_MAP[productId] : undefined;

      if (!productConfig) {
        console.warn(`[DODO WEBHOOK] ⚠️ Unknown product_id: ${productId}. Event: ${eventType}. Full data keys: ${Object.keys(data).join(", ")}`);
        return NextResponse.json({ received: true, message: `Unknown product: ${productId}` });
      }

      // For subscription.updated, only credit if subscription status is "active"
      if (eventType === "subscription.updated" && data.status !== "active") {
        console.log(`[DODO WEBHOOK] subscription.updated with status="${data.status}" — skipping credit grant.`);
        return NextResponse.json({ received: true, message: `Subscription status: ${data.status}` });
      }

      const creditsToGrant = productConfig.credits;

      // --- 5. Resolve user_id ---
      let userId: string | null = metadataUserId || null;

      if (!userId && customerEmail) {
        const { data: usersData } = await supabase.auth.admin.listUsers();
        const matchedUser = usersData?.users?.find((u) => u.email?.toLowerCase() === customerEmail!.toLowerCase());
        if (matchedUser) {
          userId = matchedUser.id;
        } else if (usersData?.users && usersData.users.length > 0) {
          // Last resort for single-user setups
          userId = usersData.users[0].id;
        }
      }

      if (!userId) {
        console.error(`[DODO WEBHOOK] ❌ Could not resolve user. Email: ${customerEmail}, metadata.user_id: ${metadataUserId}`);
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // --- 6. Idempotency check ---
      const { data: existingTx } = await supabase
        .from("credit_transactions")
        .select("id")
        .eq("user_id", userId)
        .eq("reference_id", canonicalId)
        .maybeSingle();

      if (existingTx) {
        console.log(`[DODO WEBHOOK] Payment ${canonicalId} already processed for user ${userId}. Skipping.`);
        return NextResponse.json({ success: true, message: "Already processed", skipped: true });
      }

      // --- 7. Fetch current wallet ---
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

      // --- 8. Upsert credit wallet ---
      const walletPayload: Record<string, any> = {
        user_id: userId,
        available_credits: balanceAfter,
        plan_tier: currentPlanTier,
        updated_at: now.toISOString(),
      };
      if (productConfig.isSubscription) {
        walletPayload.next_renewal_date = data.next_billing_date || renewalDate.toISOString();
      }
      const { error: walletErr } = await supabase.from("user_wallets").upsert(walletPayload);
      if (walletErr) {
        console.error("[DODO WEBHOOK] ❌ Wallet upsert failed:", walletErr);
        return NextResponse.json({ error: "Wallet update failed" }, { status: 500 });
      }

      // --- 9. Insert immutable ledger entry ---
      const { error: txErr } = await supabase.from("credit_transactions").insert({
        user_id: userId,
        amount: creditsToGrant,
        balance_before: balanceBefore,
        balance_after: balanceAfter,
        type: productConfig.isSubscription ? "grant" : "topup",
        description: `Dodo ${eventType}: +${creditsToGrant} Credits (${productConfig.planTier.toUpperCase()})`,
        reference_id: canonicalId,
        invoice_url: canonicalId ? `https://live.dodopayments.com/invoices/payments/${canonicalId}` : null,
        created_at: now.toISOString(),
      });
      if (txErr) {
        console.error("[DODO WEBHOOK] ❌ Transaction insert failed:", txErr);
        return NextResponse.json({ error: "Transaction insert failed" }, { status: 500 });
      }

      // --- 10. Upsert subscription record if recurring ---
      if (productConfig.isSubscription) {
        await supabase.from("subscriptions").upsert({
          user_id: userId,
          plan_id: `${productConfig.planTier}_monthly`,
          status: "active",
          current_period_start: data.previous_billing_date || now.toISOString(),
          current_period_end: data.next_billing_date || renewalDate.toISOString(),
          dodo_subscription_id: data.subscription_id || canonicalId,
          updated_at: now.toISOString(),
        });
      }

      console.log(`[DODO WEBHOOK] ✅ Credited ${creditsToGrant} credits to user ${userId}. Balance: ${balanceBefore} → ${balanceAfter}. Plan: ${currentPlanTier}`);
      return NextResponse.json({ success: true, credited: creditsToGrant, balance_after: balanceAfter });
    }

    // Unhandled event type — acknowledge so Dodo doesn't retry
    console.log(`[DODO WEBHOOK] Unhandled event type: ${eventType}`);
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("[DODO WEBHOOK] ❌ Error:", error);
    return NextResponse.json({ error: error.message || "Webhook processing failed" }, { status: 500 });
  }
}

