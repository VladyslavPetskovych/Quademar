import { useState } from 'react'
import { MAILERLITE } from '../config/site'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Newsletter signup state + submit, shared by the footer and contacts forms.
 * Posts the email to MailerLite's public subscribe endpoint (see MAILERLITE in config/site).
 * Error/status copy uses the `footer.newsletter*` i18n keys so both forms read the same.
 *
 * Returns: `{ email, setEmail, consent, setConsent, status, errorKey, handleSubmit }`
 * where `status` is one of 'idle' | 'loading' | 'success' | 'error'.
 */
export function useNewsletterSubscribe() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState('idle')
  const [errorKey, setErrorKey] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'loading') return

    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error')
      setErrorKey('footer.newsletterInvalidEmail')
      return
    }
    if (!consent) {
      setStatus('error')
      setErrorKey('footer.newsletterConsentRequired')
      return
    }
    if (!MAILERLITE.formAction) {
      setStatus('error')
      setErrorKey('footer.newsletterError')
      console.warn('Newsletter: MAILERLITE.formAction is not configured.')
      return
    }

    setStatus('loading')
    setErrorKey(null)
    try {
      const body = new URLSearchParams()
      body.set('fields[email]', email.trim())
      body.set('ml-submit', '1')
      body.set('anticsrf', 'true')
      // MailerLite's subscribe endpoint is cross-origin without CORS, so the response is
      // opaque ('no-cors'): the email is recorded but we can't read a status, so we treat a
      // resolved request as success and only surface network failures as errors.
      await fetch(MAILERLITE.formAction, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      setStatus('success')
      setEmail('')
      setConsent(false)
    } catch {
      setStatus('error')
      setErrorKey('footer.newsletterError')
    }
  }

  return { email, setEmail, consent, setConsent, status, errorKey, handleSubmit }
}
