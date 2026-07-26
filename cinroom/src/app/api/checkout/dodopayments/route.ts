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
    const { packId, userEmail, userId } = await req.json();

    const productId = DODO_PRODUCT_MAP[packId] || packId;

    if (!productId) {
      return NextResponse.json({ error: "Invalid product pack ID." }, { status: 400 });
    }

    const apiKey = process.env.DODO_PAYMENTS_API_KEY || "P8N0k49snpihXwz0.nfVbvxkdNph6wvQeQfE0Z6XtajZLV1zSdtHxf2HlSyHiNd7a";
    
    // Construct production return URL
    const origin = req.headers.get("origin") || "https://www.cinroom.com";
    const successReturnUrl = `${origin}/payment/success`;

    // 1. Create Dodo Payments session with attached user_id & user_email metadata
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
          name: "Cinroom Member",
        },
        product_cart: [
          {
            product_id: productId,
            quantity: 1,
          },
        ],
        metadata: {
          user_id: userId || "",
          user_email: userEmail || "",
          pack_id: packId,
        },
        return_url: successReturnUrl,
      }),
    });

    const data = await response.json();

    if (data.payment_link) {
      const checkoutWithReturn = `${data.payment_link}?return_url=${encodeURIComponent(successReturnUrl)}&redirect=true`;
      return NextResponse.json({ checkoutUrl: checkoutWithReturn });
    }

    // Direct hosted link fallback with return URL parameters
    const directCheckoutUrl = `https://checkout.dodopayments.com/buy/${productId}?return_url=${encodeURIComponent(successReturnUrl)}&redirect=true`;
    return NextResponse.json({ checkoutUrl: directCheckoutUrl });
  } catch (error: any) {
    console.error("Dodo Checkout Error:", error);
    const successReturnUrl = "https://www.cinroom.com/payment/success";
    const productId = DODO_PRODUCT_MAP[req.url] || "pdt_0NjxLVOe3nEY8sjRUHX2Y";
    const directUrl = `https://checkout.dodopayments.com/buy/${productId}?return_url=${encodeURIComponent(successReturnUrl)}&redirect=true`;
    return NextResponse.json({ checkoutUrl: directUrl });
  }
}
