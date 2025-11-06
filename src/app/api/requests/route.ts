import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/firebaseAdmin";

const RequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  address: z.string().min(5),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  bedrooms: z.number().min(1),
  bathrooms: z.number().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  ecoCleaning: z.boolean().optional().default(false),
  additionalServices: z.array(z.string()).optional().default([]),
  serviceType: z.string().min(1),
  service: z.string().min(1),
  message: z.string().optional().default(""),
});

export async function POST(req: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json({ 
        error: "Database not configured. Please set up Firebase Admin environment variables." 
      }, { status: 500 });
    }

    const json = await req.json();
    const parsed = RequestSchema.parse(json);

    const { name, email, phone, address, city, zipCode, bedrooms, bathrooms, date, time, ecoCleaning, additionalServices, serviceType, service, message } = parsed;

    // Generate a request ID
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Split name into firstName and lastName
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Additional services pricing
    const additionalServicesPricing: Record<string, number> = {
      oven: 3800, // $38
      refrigerator: 3800, // $38
      cabinets: 4000, // $40
      microwave: 1600, // $16
      windows: 4900, // $49
      blinds: 1100, // $11
      balcony: 3200, // $32
      laundry: 2200, // $22
    };

    // Calculate price based on bedrooms and bathrooms (same logic as in PaymentModal)
    const calculatePrice = () => {
      let basePrice = 0;

      // Pricing based on bedrooms and bathrooms
      if (bedrooms === 1 && bathrooms === 1) {
        basePrice = 13900; // $139
      } else if (bedrooms === 2 && bathrooms === 1) {
        basePrice = 16900; // $169
      } else if (bedrooms === 3 && bathrooms === 2) {
        basePrice = 21900; // $219
      } else {
        // For other combinations, calculate based on size
        // Base: $139 for 1 bed/1 bath
        // Additional bedroom: +$30
        // Additional bathroom: +$20
        basePrice = 13900 + ((bedrooms - 1) * 3000) + ((bathrooms - 1) * 2000);
      }

      // Add 10% premium for eco cleaning
      if (ecoCleaning) {
        basePrice = Math.round(basePrice * 1.1);
      }

      // Add additional services prices
      if (additionalServices && additionalServices.length > 0) {
        additionalServices.forEach((serviceId: string) => {
          if (additionalServicesPricing[serviceId]) {
            basePrice += additionalServicesPricing[serviceId];
          }
        });
      }
      
      return basePrice;
    };

    const amountCents = calculatePrice();
    const datetime = `${date}T${time}`;

    const request = {
      id: requestId,
      firstName,
      lastName,
      phone,
      email,
      address: `${address}, ${city}, ${zipCode}`,
      city,
      zipCode,
      bedrooms,
      bathrooms,
      ecoCleaning: ecoCleaning || false,
      additionalServices: additionalServices || [],
      service: service, // Service category (Residential Cleaning, Commercial Cleaning, etc.)
      serviceType: serviceType, // Regular, Deep, Move-in/out, etc.
      datetime,
      notes: message || "",
      amountCents,
      status: "pending",
      createdAt: new Date().toISOString(),
      paidAt: null,
      acceptedAt: null,
    };
    
    // Save request to Firebase
    await db.collection("orders").doc(requestId).set(request);

    return NextResponse.json({ 
      success: true, 
      requestId,
      message: "Request submitted successfully" 
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid request";
    console.error("Error submitting request:", err);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

