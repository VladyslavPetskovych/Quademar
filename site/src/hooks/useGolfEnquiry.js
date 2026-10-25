import { useState } from 'react'
import { GOLF_ENQUIRY } from '../config/site'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY = { name: '', email: '', arrival: '', departure: '', phone: '', message: '' }

/**
 * Golf escape enquiry form state + submit (see GOLF_ENQUIRY in config/site).
 * Posts JSON to FormSubmit's AJAX endpoint, which forwards it as an email to the hotel.
 *
 * Returns: `{ values, setField, consent, setConsent, honey, setHoney, status, errorKey, handleSubmit }`
 * where `status` is one of 'idle' | 'loading' | 'success' | 'error' and `errorKey` names a
 * key inside the page's local copy (`required` | `invalidEmail` | `dates` | `consent` | `failed`).
 */
export function useGolfEnquiry({ subject }) {
  const [values, setValues] = useState(EMPTY)
  const [consent, setConsent] = useState(false)
  const [honey, setHoney] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorKey, setErrorKey] = useState(null)

  const setField = (name, value) => setValues((prev) => ({ ...prev, [name]: value }))

  function fail(key) {
    setStatus('error')
    setErrorKey(key)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'loading') return

    const name = values.name.trim()
    const email = values.email.trim()
    if (!name || !email) return fail('required')
    if (!EMAIL_RE.test(email)) return fail('invalidEmail')
    if (values.arrival && values.departure && values.departure < values.arrival) return fail('dates')
    if (!consent) return fail('consent')
    // Bots fill every input, including the visually hidden honeypot — pretend success.
    if (honey) {
      setStatus('success')
      return
    }

    setStatus('loading')
    setErrorKey(null)
    try {
      const res = await fetch(GOLF_ENQUIRY.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `${subject} — ${name}`,
          _template: 'table',
          _replyto: email,
          name,
          email,
          phone: values.phone.trim(),
          arrival: values.arrival,
          departure: values.departure,
          message: values.message.trim(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || res.statusText)
      setStatus('success')
      setValues(EMPTY)
      setConsent(false)
    } catch (err) {
      console.warn('Golf enquiry failed:', err)
      fail('failed')
    }
  }

  return { values, setField, consent, setConsent, honey, setHoney, status, errorKey, handleSubmit }
}
