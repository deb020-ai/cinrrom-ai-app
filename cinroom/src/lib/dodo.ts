import DodoPayments from "dodopayments";

if (!process.env.DODO_PAYMENTS_API_KEY) {
  console.warn("DODO_PAYMENTS_API_KEY environment variable is not set.");
}

export const dodoPayments = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY || "dodo_test_mock_key",
  environment: process.env.NODE_ENV === "production" ? "live_mode" : "test_mode",
});
