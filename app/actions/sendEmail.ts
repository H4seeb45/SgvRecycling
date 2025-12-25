"use server";

import { Resend } from "resend";
import { z } from "zod";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Zod Schema for Contact Form Validation
const ContactFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Name is too long"),
  company: z.string().max(100, "Company name is too long").optional(),
  email: z.string().email("Invalid email address"),
  topic: z.enum(["collection", "sell", "general"], {
    message: "Please select a valid topic",
  }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
  // Honeypot field - must be empty or undefined
  website_url: z.string().optional(),
  // Additional honeypot field for extra protection
  honeyPot: z.string().max(0, "Bot detected").optional(),
});

// Helper function to sanitize text (remove HTML tags and escape special characters)
function sanitizeText(text: string): string {
  // Remove HTML tags
  const withoutHtml = text.replace(/<[^>]*>/g, "");
  // Escape special characters that could be used for injection
  return withoutHtml
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export async function sendEmail(formData: FormData) {
  try {
    // Step 1: Extract raw data from FormData
    const rawData = {
      fullName: formData.get("fullName") as string | null,
      company: formData.get("company") as string | null,
      email: formData.get("email") as string | null,
      topic: formData.get("topic") as string | null,
      message: formData.get("message") as string | null,
      website_url: formData.get("website_url") as string | null, // Honeypot field
      honeyPot: formData.get("honeyPot") as string | null, // Additional honeypot
    };

    // Debug: Log raw data
    console.log("[DEBUG] Raw FormData extracted:", rawData);

    // Step 2: Bot Trap - Silent Rejection
    // If honeypot fields are filled, it's a bot - return fake success
    if (rawData.website_url || rawData.honeyPot) {
      console.warn("[SECURITY] Bot detected and blocked via honeypot field");
      // Return fake success to confuse the bot
      return { success: true, message: "Thank you for your message" };
    }

    // Step 3: Validate with Zod
    // Convert null values to empty strings or undefined for validation
    const dataToValidate = {
      fullName: rawData.fullName || "",
      company: rawData.company || undefined,
      email: rawData.email || "",
      topic: rawData.topic || "",
      message: rawData.message || "",
      website_url: undefined, // Should always be undefined for real users
      honeyPot: undefined, // Should always be undefined for real users
    };

    // Debug: Log data before validation
    console.log("[VALIDATION] Data to validate:", dataToValidate);

    const validatedFields = ContactFormSchema.safeParse(dataToValidate);

    if (!validatedFields.success) {
      console.error("[VALIDATION] Form validation failed:", {
        issues: validatedFields.error.issues,
        rawData: rawData,
        dataToValidate: dataToValidate,
      });

      // Return more detailed error message
      const errorMessages = validatedFields.error.issues
        .map((err) => {
          const field =
            err.path.length > 0 ? err.path.join(".") : "unknown field";
          return `${field}: ${err.message || "Invalid value"}`;
        })
        .join(", ");

      return {
        success: false,
        error:
          errorMessages || "Invalid input data. Please check your form fields.",
        details: validatedFields.error.issues,
      };
    }

    const { fullName, company, email, topic, message } = validatedFields.data;

    // Step 4: Sanitize all text fields
    const sanitizedFullName = sanitizeText(fullName);
    const sanitizedCompany = company ? sanitizeText(company) : undefined;
    const sanitizedMessage = sanitizeText(message);

    // Step 5: Map topic to readable format
    const topicLabels: Record<string, string> = {
      collection: "Schedule Collection",
      sell: "Sell Material",
      general: "General Inquiry",
    };
    const topicLabel = topicLabels[topic] || topic;

    // Step 6: Send email via Resend
    if (!process.env.RESEND_API_KEY) {
      console.error("[CONFIG] RESEND_API_KEY is not set");
      return {
        success: false,
        error:
          "Email service is not configured. Please contact support directly.",
      };
    }

    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "SGV Recycle <noreply@sgvrecycle.co.uk>",
      to: process.env.RESEND_TO_EMAIL || "salim@sgvrecyclingltd.co.uk",
      replyTo: email,
      subject: `New Contact Form Submission: ${topicLabel}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #7CC444; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #475569; }
              .value { margin-top: 5px; color: #1e293b; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #64748b; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Topic:</div>
                  <div class="value">${topicLabel}</div>
                </div>
                <div class="field">
                  <div class="label">Full Name:</div>
                  <div class="value">${sanitizedFullName}</div>
                </div>
                ${
                  sanitizedCompany
                    ? `
                <div class="field">
                  <div class="label">Company:</div>
                  <div class="value">${sanitizedCompany}</div>
                </div>
                `
                    : ""
                }
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${sanitizedMessage.replace(
                    /\n/g,
                    "<br>"
                  )}</div>
                </div>
              </div>
              <div class="footer">
                <p>This email was sent from the SGV Recycle contact form.</p>
                <p>Reply directly to this email to respond to ${sanitizedFullName}.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission: ${topicLabel}

Full Name: ${sanitizedFullName}
${sanitizedCompany ? `Company: ${sanitizedCompany}\n` : ""}Email: ${email}

Message:
${sanitizedMessage}

---
This email was sent from the SGV Recycle contact form.
Reply directly to this email to respond to ${sanitizedFullName}.
      `,
    });

    if (error) {
      console.error("[RESEND] Error sending email:", error);
      return {
        success: false,
        error:
          "Failed to send email. Please try again later or contact us directly.",
      };
    }

    console.log("[RESEND] Email sent successfully:", data?.id);

    return {
      success: true,
      message:
        "Your message has been sent successfully. We will get back to you shortly.",
      id: data?.id,
    };
  } catch (error) {
    console.error("[ERROR] Unexpected error in sendEmail:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
