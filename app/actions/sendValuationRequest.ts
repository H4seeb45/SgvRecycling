'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const ValuationRequestSchema = z.object({
  materialCategory: z.string().min(1, 'Material category is required'),
  estimatedWeight: z.string().min(1, 'Estimated weight is required'),
  saleType: z.string().min(1, 'Sale type is required'),
  materialGrade: z.string().min(1, 'Material grade is required'),
  name: z.string().min(1, 'Name is required').max(100),
  company: z.string().max(100).optional(),
  email: z.string().email('Invalid email address'),
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

export async function sendValuationRequest(formData: FormData) {
  try {
    const rawData = {
      materialCategory: formData.get('materialCategory') as string | null,
      estimatedWeight: formData.get('estimatedWeight') as string | null,
      saleType: formData.get('saleType') as string | null,
      materialGrade: formData.get('materialGrade') as string | null,
      name: formData.get('name') as string | null,
      company: formData.get('company') as string | null,
      email: formData.get('email') as string | null,
      website_url: formData.get('website_url') as string | null,
      honeyPot: formData.get('honeyPot') as string | null,
    }

    // Bot trap
    if (rawData.website_url || rawData.honeyPot) {
      console.warn('[SECURITY] Bot detected in valuation request')
      return { success: true }
    }

    const validatedFields = ValuationRequestSchema.safeParse({
      materialCategory: rawData.materialCategory,
      estimatedWeight: rawData.estimatedWeight,
      saleType: rawData.saleType,
      materialGrade: rawData.materialGrade,
      name: rawData.name,
      company: rawData.company || undefined,
      email: rawData.email,
      website_url: undefined,
      honeyPot: undefined,
    })

    if (!validatedFields.success) {
      return {
        success: false,
        error: 'Invalid input data. Please check your form fields.',
      }
    }

    const { materialCategory, estimatedWeight, saleType, materialGrade, name, company, email } = validatedFields.data

    if (!process.env.RESEND_API_KEY) {
      return {
        success: false,
        error: 'Email service is not configured.',
      }
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'SGV Recycle <noreply@sgvrecycle.co.uk>',
      to: 'salim@sgvrecyclingltd.co.uk',
      replyTo: email,
      subject: `New Material Valuation Request: ${materialCategory}`,
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
                <h2>New Material Valuation Request</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${sanitizeText(name)}</div>
                </div>
                ${company ? `
                <div class="field">
                  <div class="label">Company:</div>
                  <div class="value">${sanitizeText(company)}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Material Category:</div>
                  <div class="value">${sanitizeText(materialCategory)}</div>
                </div>
                <div class="field">
                  <div class="label">Estimated Weight:</div>
                  <div class="value">${sanitizeText(estimatedWeight)}</div>
                </div>
                <div class="field">
                  <div class="label">Sale Type:</div>
                  <div class="value">${sanitizeText(saleType)}</div>
                </div>
                <div class="field">
                  <div class="label">Material Grade:</div>
                  <div class="value">${sanitizeText(materialGrade)}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Material Valuation Request

Name: ${sanitizeText(name)}
${company ? `Company: ${sanitizeText(company)}\n` : ''}Email: ${email}
Material Category: ${sanitizeText(materialCategory)}
Estimated Weight: ${sanitizeText(estimatedWeight)}
Sale Type: ${sanitizeText(saleType)}
Material Grade: ${sanitizeText(materialGrade)}
      `,
    })

    if (error) {
      console.error('[RESEND] Error sending valuation request:', error)
      return { success: false, error: 'Failed to send request. Please try again later.' }
    }

    return { success: true, message: 'Valuation request sent successfully.' }
  } catch (error) {
    console.error('[ERROR] Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

