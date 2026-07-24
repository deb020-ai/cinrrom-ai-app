import { NextResponse } from "next/server";
import { db } from "@/db";
import { organizations, creditTransactions } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const eventType = body.type || body.event;

    // Listen for payment or subscription events from Dodo Payments
    if (eventType === "payment.succeeded" || eventType === "subscription.active" || eventType === "subscription.renewed") {
      const data = body.data || body;
      const metadata = data.metadata || {};
      const organizationId = metadata.organizationId;
      const purchasedCredits = parseInt(metadata.credits || "50", 10);
      const referenceId = data.payment_id || data.subscription_id || "dodo_ref_mock";

      if (!organizationId) {
        console.warn("Dodo Webhook received without organizationId in metadata");
        return NextResponse.json({ error: "Missing organizationId metadata" }, { status: 400 });
      }

      // Execute Atomic Credit Increment + Ledger Entry Transaction
      await db.transaction(async (tx) => {
        const [org] = await tx
          .update(organizations)
          .set({
            creditBalance: sql`${organizations.creditBalance} + ${purchasedCredits}`,
            dodoCustomerId: data.customer?.customer_id || null,
            dodoSubscriptionId: data.subscription_id || null,
            updatedAt: new Date(),
          })
          .where(eq(organizations.id, organizationId))
          .returning();

        if (org) {
          await tx.insert(creditTransactions).values({
            organizationId,
            amount: purchasedCredits,
            balanceAfter: org.creditBalance,
            type: eventType.includes("subscription") ? "SUBSCRIPTION_REFILL" : "TOP_UP",
            description: `Added ${purchasedCredits} credits via Dodo Payments (${eventType})`,
            referenceId,
          });
        }
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Dodo Webhook Error:", error);
    return NextResponse.json({ error: error.message || "Webhook processing failed" }, { status: 500 });
  }
}
