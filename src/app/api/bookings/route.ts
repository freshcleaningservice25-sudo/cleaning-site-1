import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";

const BookingSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(7),
  email: z.string().email(),
  address: z.string().min(5),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  additionalAddress: z.string().optional().default(""),
  service: z.enum([
    "1 bedroom, 1 bathroom",
    "2 bedrooms, 1 bathroom",
    "3 bedrooms, 2 bathrooms",
  ]),
  hours: z.enum(["2 hours", "3 hours", "4 hours"]),
  datetime: z.string().min(1),
  notes: z.string().optional().default(""),
});

function getPriceCents(service: string, hours: string): number {
  const base = {
    "1 bedroom, 1 bathroom": 9000,
    "2 bedrooms, 1 bathroom": 12000,
    "3 bedrooms, 2 bathrooms": 16000,
  }[service] ?? 9000;
  const multiplier = { "2 hours": 1, "3 hours": 1.4, "4 hours": 1.8 }[hours] ?? 1;
  return Math.round(base * multiplier);
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = BookingSchema.parse(json);

    const { firstName, lastName, phone, email, address, city, zipCode, additionalAddress, service, hours, datetime, notes } = parsed;

    const priceCents = getPriceCents(service, hours);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Generate a simple order ID for now (without Firebase)
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const order = {
      id: orderId,
      status: "pending",
      firstName,
      lastName,
      phone,
      email,
      address,
      city,
      zipCode,
      additionalAddress,
      service,
      hours,
      datetime,
      notes,
      amountCents: priceCents,
      createdAt: new Date().toISOString(),
    };
    
    // For now, we'll just log the order (you can implement proper storage later)
    console.log("New booking order:", order);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      submit_type: "pay",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: priceCents,
            product_data: {
              name: `Home cleaning — ${service} • ${hours}`,
              description: `${address}, ${city}, ${zipCode}${additionalAddress ? ` - ${additionalAddress}` : ''}`,
            },
          },
        },
      ],
      customer_email: email,
      success_url: `${siteUrl}/book?success=1&orderId=${orderId}`,
      cancel_url: `${siteUrl}/book?canceled=1&orderId=${orderId}`,
      metadata: {
        orderId: orderId,
      },
    });

    return NextResponse.json({ checkoutUrl: session.url }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

