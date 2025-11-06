import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { db } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing webhook secret" }, { status: 400 });
  }

  const buf = Buffer.from(await req.arrayBuffer());

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook Error";
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { metadata?: { orderId?: string } };
    const orderId = session.metadata?.orderId;
    if (orderId && db) {
      // Update order status to "paid" in Firebase
      await db.collection("orders").doc(orderId).update({
        status: "paid",
        paidAt: new Date().toISOString(),
      });
      console.log("Payment successful for order:", orderId);
    }
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as { metadata?: { requestId?: string } };
    const requestId = paymentIntent.metadata?.requestId;
    if (requestId && db) {
      // Update order status to "paid" in Firebase
      await db.collection("orders").doc(requestId).update({
        status: "paid",
        paidAt: new Date().toISOString(),
      });
      console.log("Payment successful for request:", requestId);
    }
  }

  return NextResponse.json({ received: true });
}

