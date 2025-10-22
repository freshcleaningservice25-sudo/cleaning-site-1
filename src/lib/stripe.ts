import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn("Missing STRIPE_SECRET_KEY - Stripe functionality will be disabled");
}

export const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: "2025-08-27.basil",
}) : null;

