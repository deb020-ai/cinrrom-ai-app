import { NextResponse } from "next/server";
import { dodoPayments } from "@/lib/dodo";

export async function POST(req: Request) {
  try {
    const { productId, organizationId, credits, userEmail, returnUrl } = await req.json();

    if (!productId || !organizationId) {
      return NextResponse.json({ error: "productId and organizationId are required." }, { status: 400 });
    }

    const payment = await dodoPayments.payments.create({
      billing: {
        city: "New York",
        country: "US",
        state: "NY",
        street: "5th Ave",
        zipcode: "10001",
      },
      customer: {
        email: userEmail || "atelier@cinroom.com",
        name: "Cinroom Atelier Workspace",
      },
      product_cart: [
        {
          product_id: productId,
          quantity: 1,
        },
      ],
      metadata: {
        organizationId,
        credits: (credits || 50).toString(),
      },
      return_url: returnUrl || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/settings?checkout=success`,
    });

    return NextResponse.json({ url: payment.payment_link });
  } catch (error: any) {
    console.error("Dodo Checkout Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create checkout session" }, { status: 500 });
  }
}
