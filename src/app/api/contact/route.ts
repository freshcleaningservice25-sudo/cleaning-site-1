import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/firebaseAdmin";
import { Resend } from "resend";

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  message: z.string().min(5),
});

export async function POST(req: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { error: "Database not configured. Please set up Firebase Admin environment variables." },
        { status: 500 }
      );
    }

    const json = await req.json();
    const parsed = ContactSchema.parse(json);

    const { name, email, phone, message } = parsed;
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    await db.collection("contactMessages").doc(contactId).set({
      id: contactId,
      name,
      email,
      phone,
      message,
      createdAt: new Date().toISOString(),
      status: "new",
    });

    // Send notification email (best-effort)
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM || "Go Clean USA <onboarding@resend.dev>";
    const notifyTo = process.env.CONTACT_NOTIFY_EMAIL || "Contact@gocleanusa.com";

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: resendFrom,
        to: notifyTo,
        subject: `New contact request from ${name}`,
        text: `You have a new contact request.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}\n\nRequest ID: ${contactId}\n`,
      });
    }

    return NextResponse.json({ success: true, message: "Contact request received" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid request";
    console.error("Error submitting contact request:", err);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
