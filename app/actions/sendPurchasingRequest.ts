'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const PurchasingRequestSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100),
  businessEmail: z.string().email('Invalid email address'),
  companyName: z.string().min(1, 'Company name is required').max(100),
  materialType: z.string().min(1, 'Material type is required'),
  estimatedQuantity: z.string().min(1, 'Estimated quantity is required'),
  additionalDetails: z.string().max(2000).optional(),
  website_url: z.string().optional(),
  honeyPot: z.string().max(0, 'Bot detected').optional(),
})

function sanitizeText(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

export async function sendPurchasingRequest(formData: FormData) {
  try {
    const rawData = {
      fullName: formData.get('fullName') as string | null,
      businessEmail: formData.get('businessEmail') as string | null,
      companyName: formData.get('companyName') as string | null,
      materialType: formData.get('materialType') as string | null,
      estimatedQuantity: formData.get('estimatedQuantity') as string | null,
      additionalDetails: formData.get('additionalDetails') as string | null,
      website_url: formData.get('website_url') as string | null,
      honeyPot: formData.get('honeyPot') as string | null,
    }

    // Bot trap
    if (rawData.website_url || rawData.honeyPot) {
      console.warn('[SECURITY] Bot detected in purchasing request')
      return { success: true }
    }

    const validatedFields = PurchasingRequestSchema.safeParse({
      fullName: rawData.fullName,
      businessEmail: rawData.businessEmail,
      companyName: rawData.companyName,
      materialType: rawData.materialType,
      estimatedQuantity: rawData.estimatedQuantity,
      additionalDetails: rawData.additionalDetails || undefined,
      website_url: undefined,
      honeyPot: undefined,
    })

    if (!validatedFields.success) {
      return {
        success: false,
        error: 'Invalid input data. Please check your form fields.',
      }
    }

    const { fullName, businessEmail, companyName, materialType, estimatedQuantity, additionalDetails } = validatedFields.data

    if (!process.env.RESEND_API_KEY) {
      return {
        success: false,
        error: 'Email service is not configured.',
      }
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'SGV Recycle <noreply@sgvrecycle.co.uk>',
      to: 'salim@sgvrecyclingltd.co.uk',
      replyTo: businessEmail,
      subject: `New Purchasing Request: ${materialType} - ${companyName}`,
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
                <h2>New Purchasing Request</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Full Name:</div>
                  <div class="value">${sanitizeText(fullName)}</div>
                </div>
                <div class="field">
                  <div class="label">Company Name:</div>
                  <div class="value">${sanitizeText(companyName)}</div>
                </div>
                <div class="field">
                  <div class="label">Business Email:</div>
                  <div class="value"><a href="mailto:${businessEmail}">${businessEmail}</a></div>
                </div>
                <div class="field">
                  <div class="label">Material Type:</div>
                  <div class="value">${sanitizeText(materialType)}</div>
                </div>
                <div class="field">
                  <div class="label">Estimated Quantity:</div>
                  <div class="value">${sanitizeText(estimatedQuantity)}</div>
                </div>
                ${additionalDetails ? `
                <div class="field">
                  <div class="label">Additional Details:</div>
                  <div class="value">${sanitizeText(additionalDetails).replace(/\n/g, '<br>')}</div>
                </div>
                ` : ''}
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Purchasing Request

Full Name: ${sanitizeText(fullName)}
Company Name: ${sanitizeText(companyName)}
Business Email: ${businessEmail}
Material Type: ${sanitizeText(materialType)}
Estimated Quantity: ${sanitizeText(estimatedQuantity)}
${additionalDetails ? `Additional Details: ${sanitizeText(additionalDetails)}\n` : ''}
      `,
    })

    if (error) {
      console.error('[RESEND] Error sending purchasing request:', error)
      return { success: false, error: 'Failed to send request. Please try again later.' }
    }

    return { success: true, message: 'Purchasing request sent successfully.' }
  } catch (error) {
    console.error('[ERROR] Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

