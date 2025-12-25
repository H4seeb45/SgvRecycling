"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const CollectionRequestSchema = z.object({
  companyName: z.string().min(1, "Company name is required").max(100),
  contactName: z.string().min(1, "Contact name is required").max(100),
  phoneNumber: z.string().min(1, "Phone number is required").max(20),
  materialType: z.string().min(1, "Material type is required"),
  postcode: z.string().min(1, "Postcode/Address is required").max(500),
  estimatedWeight: z.string().min(1, "Estimated weight is required").max(100),
  website_url: z.string().optional(),
  honeyPot: z.string().max(0, "Bot detected").optional(),
});

function sanitizeText(text: string): string {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export async function sendCollectionRequest(formData: FormData) {
  try {
    const rawData = {
      companyName: formData.get("companyName") as string | null,
      contactName: formData.get("contactName") as string | null,
      phoneNumber: formData.get("phoneNumber") as string | null,
      materialType: formData.get("materialType") as string | null,
      postcode: formData.get("postcode") as string | null,
      estimatedWeight: formData.get("estimatedWeight") as string | null,
      website_url: formData.get("website_url") as string | null,
      honeyPot: formData.get("honeyPot") as string | null,
    };

    // Bot trap
    if (rawData.website_url || rawData.honeyPot) {
      console.warn("[SECURITY] Bot detected in collection request");
      return { success: true };
    }

    const validatedFields = CollectionRequestSchema.safeParse({
      companyName: rawData.companyName,
      contactName: rawData.contactName,
      phoneNumber: rawData.phoneNumber,
      materialType: rawData.materialType,
      postcode: rawData.postcode,
      estimatedWeight: rawData.estimatedWeight,
      website_url: undefined,
      honeyPot: undefined,
    });

    console.log(validatedFields);

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Invalid input data. Please check your form fields.",
      };
    }

    const {
      companyName,
      contactName,
      phoneNumber,
      materialType,
      postcode,
      estimatedWeight,
    } = validatedFields.data;

    if (!process.env.RESEND_API_KEY) {
      return {
        success: false,
        error: "Email service is not configured.",
      };
    }

    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "SGV Recycle <noreply@sgvrecycle.co.uk>",
      to: "salim@sgvrecyclingltd.co.uk",
      replyTo: contactName + " <noreply@sgvrecycle.co.uk>",
      subject: `New Collection Request: ${materialType} - ${postcode}`,
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
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Collection Request</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Company Name:</div>
                  <div class="value">${sanitizeText(companyName)}</div>
                </div>
                <div class="field">
                  <div class="label">Contact Name:</div>
                  <div class="value">${sanitizeText(contactName)}</div>
                </div>
                <div class="field">
                  <div class="label">Phone Number:</div>
                  <div class="value">${sanitizeText(phoneNumber)}</div>
                </div>
                <div class="field">
                  <div class="label">Material Type:</div>
                  <div class="value">${sanitizeText(materialType)}</div>
                </div>
                <div class="field">
                  <div class="label">Postcode:</div>
                  <div class="value">${sanitizeText(postcode)}</div>
                </div>
                <div class="field">
                  <div class="label">Estimated Weight/Volume:</div>
                  <div class="value">${sanitizeText(estimatedWeight)}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Collection Request

Company Name: ${sanitizeText(companyName)}
Contact Name: ${sanitizeText(contactName)}
Phone Number: ${sanitizeText(phoneNumber)}
Material Type: ${sanitizeText(materialType)}
Postcode: ${sanitizeText(postcode)}
Estimated Weight/Volume: ${sanitizeText(estimatedWeight)}
      `,
    });

    if (error) {
      console.error("[RESEND] Error sending collection request:", error);
      return {
        success: false,
        error: "Failed to send request. Please try again later.",
      };
    }

    return { success: true, message: "Collection request sent successfully." };
  } catch (error) {
    console.error("[ERROR] Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
