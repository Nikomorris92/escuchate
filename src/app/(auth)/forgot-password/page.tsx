'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useLang } from '@/lib/LangContext'

export default function ForgotPasswordPage() {
  const { lang } = useLang()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/confirm`,
    })

    if (error) {
      setError(lang === 'es' ? 'Error al enviar el email. Verifica la dirección.' : 'Error sending email. Check the address.')
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <div className="page-container">
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        {sent ? (
          <>
            <h1 style={{ fontSize: '1.375rem', fontWeight: '700', marginBottom: '0.375rem', color: '#ffffff' }}>
              {lang === 'es' ? '¡Email enviado!' : 'Email sent!'}
            </h1>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.75rem' }}>
              {lang === 'es'
                ? 'Revisa tu bandeja de entrada y haz clic en el enlace para restablecer tu contraseña.'
                : 'Check your inbox and click the link to reset your password.'}
            </p>
            <Link href="/login" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
              {lang === 'es' ? '← Volver al inicio de sesión' : '← Back to login'}
            </Link>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: '1.375rem', fontWeight: '700', marginBottom: '0.375rem', color: '#ffffff' }}>
              {lang === 'es' ? 'Recuperar contraseña' : 'Recover password'}
            </h1>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.75rem' }}>
              {lang === 'es'
                ? 'Introduce tu email y te enviaremos un enlace para restablecer tu contraseña.'
                : 'Enter your email and we will send you a link to reset your password.'}
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <input
                className="input-field"
                type="email"
                placeholder={lang === 'es' ? 'Tu email' : 'Your email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {error && (
                <p style={{ fontSize: '0.875rem', color: '#c4783a' }}>{error}</p>
              )}

              <button className="btn-primary" type="submit" disabled={loading}>
                {loading
                  ? (lang === 'es' ? 'Enviando…' : 'Sending…')
                  : (lang === 'es' ? 'Enviar enlace' : 'Send link')}
              </button>
            </form>

            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>
              <Link href="/login" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {lang === 'es' ? '← Volver al inicio de sesión' : '← Back to login'}
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
