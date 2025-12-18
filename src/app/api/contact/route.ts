import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/firebaseAdmin";
import { Resend } from "resend";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Phone number must be at least 5 characters"),
  message: z.string().min(5, "Message must be at least 5 characters"),
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
    const resendFrom = process.env.RESEND_FROM || process.env.RESEND_FROM_EMAIL || "Go Clean USA <onboarding@resend.dev>";
    const notifyTo = process.env.CONTACT_NOTIFY_EMAIL || "Contact@gocleanusa.com";

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const emailResult = await resend.emails.send({
          from: resendFrom,
          to: notifyTo,
          subject: `New contact request from ${name}`,
          text: `You have a new contact request.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}\n\nRequest ID: ${contactId}\n`,
          html: `
            <h2>New Contact Request</h2>
            <p>You have received a new contact request from your website.</p>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${phone}</li>
              <li><strong>Request ID:</strong> ${contactId}</li>
            </ul>
            <h3>Message:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        });
        console.log("Email sent successfully:", emailResult);
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error("Failed to send notification email:", emailError);
        console.error("Email config - From:", resendFrom, "To:", notifyTo, "API Key present:", !!resendApiKey);
      }
    } else {
      console.warn("RESEND_API_KEY not configured. Email notification skipped.");
    }

    return NextResponse.json({ success: true, message: "Contact request received" });
  } catch (err: unknown) {
    console.error("Error submitting contact request:", err);
    
    // Handle Zod validation errors
    if (err instanceof z.ZodError) {
      const firstError = err.issues[0];
      let errorMessage = "Please check your input and try again.";
      
      if (firstError && firstError.path && firstError.path[0] === "message") {
        errorMessage = "Message must be at least 5 characters long.";
      } else if (firstError && firstError.path && firstError.path[0] === "email") {
        errorMessage = "Please enter a valid email address.";
      } else if (firstError && firstError.path && firstError.path[0] === "phone") {
        errorMessage = "Phone number must be at least 5 characters.";
      } else if (firstError && firstError.path && firstError.path[0] === "name") {
        errorMessage = "Name is required.";
      }
      
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    
    const message = err instanceof Error ? err.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
