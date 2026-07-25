import { NextResponse } from "next/server";

const DODO_PRODUCT_MAP: Record<string, string> = {
  starter_onetime: "pdt_0NjxLVOe3nEY8sjRUHX2Y",
  growth_monthly: "pdt_0NjxLVR4OKFIjgwVqLH9w",
  business_monthly: "pdt_0NjxLVSkfoUw6zbz1LPuj",
  topup_6: "pdt_0NjxLVTamfL0YIUl8hEZw",
  topup_12: "pdt_0NjxLVUUg9GB4M4uaI1QN",
  topup_24: "pdt_0NjxLVVLYM1wFfqj85Jt8",
  topup_48: "pdt_0NjxLVWDCzQSPmiqnb6d7",
  topup_96: "pdt_0NjxLVX6NbGgFun9fffNj",
};

export async function POST(req: Request) {
  try {
    const { packId, userEmail } = await req.json();

    const productId = DODO_PRODUCT_MAP[packId] || packId;

    if (!productId) {
      return NextResponse.json({ error: "Invalid product pack ID." }, { status: 400 });
    }

    const apiKey = process.env.DODO_PAYMENTS_API_KEY || "P8N0k49snpihXwz0.nfVbvxkdNph6wvQeQfE0Z6XtajZLV1zSdtHxf2HlSyHiNd7a";

    // Call Dodo Payments API to create payment session
    const response = await fetch("https://live.dodopayments.com/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        billing: {
          city: "Mumbai",
          country: "IN",
          state: "MH",
          street: "Studio Address",
          zipcode: "400001",
        },
        customer: {
          email: userEmail || "deb@cinroom.com",
          name: "Cinroom Luxury Member",
        },
        product_cart: [
          {
            product_id: productId,
            quantity: 1,
          },
        ],
        return_url: "https://www.cinroom.com/dashboard/settings?checkout=success",
      }),
    });

    const data = await response.json();

    if (data.payment_link) {
      return NextResponse.json({ checkoutUrl: data.payment_link });
    }

    // Direct hosted link fallback
    const directCheckoutUrl = `https://checkout.dodopayments.com/buy/${productId}`;
    return NextResponse.json({ checkoutUrl: directCheckoutUrl });
  } catch (error: any) {
    console.error("Dodo Checkout Error:", error);
    const directUrl = `https://checkout.dodopayments.com/buy/${DODO_PRODUCT_MAP[req.url] || "pdt_0NjxLVOe3nEY8sjRUHX2Y"}`;
    return NextResponse.json({ checkoutUrl: directUrl });
  }
}
