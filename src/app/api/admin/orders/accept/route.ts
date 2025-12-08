import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/firebaseAdmin";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get("admin-auth")?.value === "true";
    
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    // Get the order from Firebase
    const orderDoc = await db.collection("orders").doc(orderId).get();
    
    if (!orderDoc.exists) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const order = orderDoc.data();

    if (!order) {
      return NextResponse.json({ error: "Order data not found" }, { status: 404 });
    }

    // Check if order is already in progress or accepted
    if (order.status === "in progress" || order.status === "accepted") {
      return NextResponse.json({ message: "Order already in progress" }, { status: 200 });
    }

    // Update order status to "in progress"
    await db.collection("orders").doc(orderId).update({
      status: "in progress",
      acceptedAt: new Date().toISOString(),
    });

    // Send email notification to the client
    let emailSent = false;
    let emailError = null;
    
    if (!resend) {
      console.warn("⚠️ Resend API key not configured. Email will not be sent.");
      emailError = "Email service not configured (RESEND_API_KEY missing)";
    } else if (!order?.email) {
      console.warn("⚠️ No email address found for order.");
      emailError = "No email address in order";
    } else {
      try {
        const fromEmail = process.env.RESEND_FROM_EMAIL;
        
        if (!fromEmail) {
          console.warn("⚠️ RESEND_FROM_EMAIL not configured. Email will not be sent.");
          emailError = "From email not configured (RESEND_FROM_EMAIL missing)";
        } else {
          console.log(`📧 Attempting to send email to: ${order.email}`);
          
          const emailResult = await resend.emails.send({
            from: fromEmail,
            to: order.email,
            subject: "Your Cleaning Service Order Has Been Accepted! 🎉",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #0C5E3E;">Order Accepted!</h2>
                <p>Hello ${order.firstName} ${order.lastName},</p>
                <p>Great news! We've accepted your cleaning service order and we're excited to help you!</p>
                
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0;">Order Details:</h3>
                  <p><strong>Order ID:</strong> ${orderId}</p>
                  <p><strong>Service:</strong> ${order.service || "N/A"}</p>
                  <p><strong>Service Type:</strong> ${order.serviceType || "N/A"}</p>
                  <p><strong>Date & Time:</strong> ${new Date(order.datetime).toLocaleString()}</p>
                  <p><strong>Address:</strong> ${order.address}${order.city ? `, ${order.city}` : ''}${order.zipCode ? `, ${order.zipCode}` : ''}</p>
                  <p><strong>Amount:</strong> $${(order.amountCents / 100).toFixed(2)}</p>
                </div>
                
                <p>We'll be in touch shortly to confirm the details and answer any questions you may have.</p>
                
                <p>Thank you for choosing Go Clean USA!</p>
                
                <p style="color: #666; font-size: 14px; margin-top: 30px;">
                  Best regards,<br>
                  The Go Clean USA Team
                </p>
              </div>
            `,
          });
          
          console.log("✅ Email sent successfully:", emailResult);
          emailSent = true;
        }
      } catch (err) {
        console.error("❌ Failed to send email:", err);
        emailError = err instanceof Error ? err.message : "Unknown error";
      }
    }

    const message = emailSent 
      ? "Order accepted and email sent" 
      : `Order accepted. ${emailError ? `Email not sent: ${emailError}` : "Email not sent"}`;
    
    return NextResponse.json({ 
      success: true, 
      message,
      emailSent,
      emailError: emailError || undefined
    });
  } catch (err) {
    console.error("Error accepting order:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to accept order";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
