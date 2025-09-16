import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { db } from "../../../../lib/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing webhook secret" }, { status: 400 });
  }

  const buf = Buffer.from(await req.arrayBuffer());

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const orderId = session.metadata?.orderId as string | undefined;
    if (orderId) {
      await db.collection("orders").doc(orderId).update({ status: "paid", paidAt: new Date().toISOString() });
    }
  }

  return NextResponse.json({ received: true });
}

