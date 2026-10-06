import { SITE } from '@/data/site'

export type LeadValues = Record<string, string>

export type SubmitResult = { ok: true; preview: boolean } | { ok: false; error: string }

/**
 * Send a lead (demo request or contact message) to VITE_LEAD_ENDPOINT as JSON.
 * Without an endpoint the form runs in preview mode: nothing is sent, and the UI says so.
 */
export async function submitLead(form: 'book-a-demo' | 'contact-us', values: LeadValues): Promise<SubmitResult> {
  if (!SITE.leadEndpoint) {
    await new Promise((r) => setTimeout(r, 700))
    return { ok: true, preview: true }
  }
  try {
    const res = await fetch(SITE.leadEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ form, submittedAt: new Date().toISOString(), page: window.location.href, ...values }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return { ok: true, preview: false }
  } catch {
    return { ok: false, error: 'We could not send your request. Please check your connection and try again.' }
  }
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const IN_MOBILE = /^(?:\+?91)?[6-9]\d{9}$/

export const validators = {
  email: (v: string) => (EMAIL.test(v.trim()) ? '' : 'Enter a valid email address, like name@example.com.'),
  phone: (v: string) => (IN_MOBILE.test(v.replace(/[\s-]/g, '')) ? '' : 'Enter a 10-digit mobile number.'),
}
