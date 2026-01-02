import sgMail from '@sendgrid/mail';

/**
 * Email service using SendGrid
 * Free tier: 100 emails/day
 */

// Initialize SendGrid
let sendGridInitialized = false;

function initializeSendGrid(): boolean {
  const apiKey = process.env.SENDGRID_API_KEY;
  
  if (!apiKey) {
    console.warn("SENDGRID_API_KEY not configured. Email service unavailable.");
    return false;
  }

  if (!sendGridInitialized) {
    sgMail.setApiKey(apiKey);
    sendGridInitialized = true;
  }

  return true;
}

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
  if (!initializeSendGrid()) {
    return { success: false, error: "Email service not configured (SENDGRID_API_KEY missing)" };
  }

  const fromEmail = options.from || process.env.SENDGRID_FROM_EMAIL || process.env.SENDGRID_FROM;
  
  if (!fromEmail) {
    return { success: false, error: "From email not configured (SENDGRID_FROM_EMAIL missing)" };
  }

  // Format from email if needed
  let formattedFrom: string;
  if (fromEmail.includes('@')) {
    // If it already has @, use it as is (can be "email@domain.com" or "Name <email@domain.com>")
    formattedFrom = fromEmail;
  } else {
    // If it's just a domain, use noreply@domain
    formattedFrom = `Go Clean USA <noreply@${fromEmail}>`;
  }

  // Ensure 'to' is an array
  const toEmails = Array.isArray(options.to) ? options.to : [options.to];

  try {
    const msg = {
      to: toEmails,
      from: formattedFrom,
      subject: options.subject,
      text: options.text || options.html.replace(/<[^>]*>/g, ''), // Strip HTML if no text provided
      html: options.html,
    };

    const result = await sgMail.send(msg);
    console.log("✅ Email sent successfully via SendGrid:", result);
    return { success: true };
  } catch (error: any) {
    console.error("❌ Failed to send email via SendGrid:", error);
    
    // SendGrid error handling
    let errorMessage = "Unknown error";
    if (error?.response?.body?.errors) {
      errorMessage = error.response.body.errors.map((e: any) => e.message).join(', ');
    } else if (error?.message) {
      errorMessage = error.message;
    }
    
    return { success: false, error: errorMessage };
  }
}

