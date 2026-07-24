"use server";

import { db } from "@/db";
import { organizations, creditTransactions, videoGenerations } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function checkAndDeductCredit(params: {
  organizationId: string;
  userId: string;
  templateId: string;
  inputImageUrl: string;
  aspectRatio?: string;
  duration?: string;
  resolution?: string;
}) {
  try {
    return await db.transaction(async (tx) => {
      // 1. Fetch Organization Credit Balance
      const [org] = await tx
        .select()
        .from(organizations)
        .where(eq(organizations.id, params.organizationId))
        .limit(1);

      if (!org) {
        throw new Error("Organization workspace not found.");
      }

      if (org.creditBalance < 1) {
        throw new Error("Insufficient credit balance. Please purchase a credit pack via Dodo Payments.");
      }

      // 2. Deduct Credit Atomically
      const [updatedOrg] = await tx
        .update(organizations)
        .set({ creditBalance: sql`${organizations.creditBalance} - 1` })
        .where(eq(organizations.id, params.organizationId))
        .returning();

      // 3. Create Video Generation Job
      const [videoJob] = await tx
        .insert(videoGenerations)
        .values({
          organizationId: params.organizationId,
          userId: params.userId,
          templateId: params.templateId,
          inputImageUrl: params.inputImageUrl,
          aspectRatio: params.aspectRatio || "16:9",
          duration: params.duration || "10s",
          resolution: params.resolution || "4K",
          status: "PENDING",
          creditCost: 1,
        })
        .returning();

      // 4. Log to Credit Ledger Audit Trail
      await tx.insert(creditTransactions).values({
        organizationId: params.organizationId,
        userId: params.userId,
        amount: -1,
        balanceAfter: updatedOrg.creditBalance,
        type: "VIDEO_RENDER",
        description: `Rendered 4K Video (${params.templateId})`,
        referenceId: videoJob.id,
      });

      return {
        success: true,
        jobId: videoJob.id,
        newBalance: updatedOrg.creditBalance,
      };
    });
  } catch (error: any) {
    console.error("Credit Deduction Error:", error);
    return {
      success: false,
      error: error.message || "Failed to process credit deduction",
    };
  }
}
