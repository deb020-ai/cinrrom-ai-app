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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get("payment_id") || searchParams.get("id");
    const userEmailParam = searchParams.get("email");

    const apiKey = process.env.DODO_PAYMENTS_API_KEY || "P8N0k49snpihXwz0.nfVbvxkdNph6wvQeQfE0Z6XtajZLV1zSdtHxf2HlSyHiNd7a";

    // 1. If paymentId is present, query Dodo API directly to verify
    let dodoData: any = null;
    if (paymentId) {
      try {
        const res = await fetch(`https://live.dodopayments.com/payments/${paymentId}`, {
          headers: { Authorization: `Bearer ${apiKey}` }
        });
        if (res.ok) {
          dodoData = await res.json();
        }
      } catch (e) {
        console.error("[CHECKOUT STATUS] Dodo API fetch error:", e);
      }
    }

    // 2. Resolve user_id: prefer metadata.user_id, then email lookup
    const metadataUserId = dodoData?.metadata?.user_id;
    const customerEmail = dodoData?.customer?.email || userEmailParam || dodoData?.metadata?.user_email;

    let userId: string | null = metadataUserId || null;

    if (!userId && customerEmail) {
      const { data: usersData } = await supabase.auth.admin.listUsers();
      const user = usersData?.users?.find((u) => u.email?.toLowerCase() === customerEmail.toLowerCase());
      if (user) userId = user.id;
      else if (usersData?.users && usersData.users.length > 0) userId = usersData.users[0].id;
    }

    if (!userId) {
      return NextResponse.json({ verified: false, message: "User not found." });
    }

    // 3. Fetch current wallet
    let { data: wallet } = await supabase.from("user_wallets").select("*").eq("user_id", userId).maybeSingle();

    // 4. Idempotency: check if this payment was already credited
    const { data: existingTx } = await supabase
      .from("credit_transactions")
      .select("*")
      .eq("user_id", userId)
      .eq("reference_id", paymentId || "none")
      .maybeSingle();

    // 5. If NOT yet credited and Dodo confirms payment succeeded, credit now
    if (!existingTx && paymentId && dodoData && (dodoData.status === "succeeded" || dodoData.status === "successful" || !dodoData.status)) {
      const productId = dodoData.product_cart?.[0]?.product_id;
      const config = PRODUCT_CREDIT_MAP[productId] || { credits: 10, planTier: "topup", isSubscription: false };

      const balanceBefore = Number(wallet?.available_credits || 0);
      const balanceAfter = balanceBefore + config.credits;
      const now = new Date();
      const renewalDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

      // Upsert wallet
      const walletPayload: Record<string, any> = {
        user_id: userId,
        available_credits: balanceAfter,
        plan_tier: config.isSubscription ? config.planTier : (wallet?.plan_tier || "free"),
        updated_at: now.toISOString(),
      };
      if (config.isSubscription) {
        walletPayload.next_renewal_date = renewalDate.toISOString();
      }
      await supabase.from("user_wallets").upsert(walletPayload);

      // Insert ledger entry
      await supabase.from("credit_transactions").insert({
        user_id: userId,
        amount: config.credits,
        balance_before: balanceBefore,
        balance_after: balanceAfter,
        type: config.isSubscription ? "grant" : "topup",
        description: `Dodo Verified Payment: +${config.credits} Credits (${config.planTier.toUpperCase()})`,
        reference_id: paymentId,
        invoice_url: dodoData?.invoice_url || dodoData?.receipt_url || (paymentId ? `https://live.dodopayments.com/invoices/payments/${paymentId}` : null),
        created_at: now.toISOString(),
      });

      // Upsert subscription if recurring
      if (config.isSubscription) {
        await supabase.from("subscriptions").upsert({
          user_id: userId,
          plan_id: `${config.planTier}_monthly`,
          status: "active",
          current_period_start: now.toISOString(),
          current_period_end: renewalDate.toISOString(),
          dodo_subscription_id: dodoData.subscription_id || paymentId,
          updated_at: now.toISOString(),
        });
      }

      // Refetch updated wallet
      const { data: updatedWallet } = await supabase.from("user_wallets").select("*").eq("user_id", userId).maybeSingle();
      wallet = updatedWallet;

      console.log(`[CHECKOUT STATUS] ✅ Credited ${config.credits} to user ${userId}. Balance: ${balanceBefore} → ${balanceAfter}`);
    }

    return NextResponse.json({
      verified: true,
      status: "succeeded",
      available_credits: Number(wallet?.available_credits || 0),
      credits_added: existingTx?.amount || (dodoData ? PRODUCT_CREDIT_MAP[dodoData?.product_cart?.[0]?.product_id]?.credits : 0) || 0,
      plan_tier: wallet?.plan_tier || "free",
      next_renewal_date: wallet?.next_renewal_date,
      transaction_id: paymentId || existingTx?.reference_id || "",
      invoice_url: dodoData?.invoice_url || (paymentId ? `https://live.dodopayments.com/invoices/payments/${paymentId}` : null),
    });

  } catch (error: any) {
    console.error("[CHECKOUT STATUS] Error:", error);
    return NextResponse.json({ error: error.message || "Status check failed" }, { status: 500 });
  }
}
