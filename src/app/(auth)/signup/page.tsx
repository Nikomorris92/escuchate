'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/i18n'

export default function SignupPage() {
  const router = useRouter()
  const { lang } = useLang()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError(t(lang, 'signup_error_short'))
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error: signupError } = await supabase.auth.signUp({ email, password })

    if (signupError) {
      setError(t(lang, 'signup_error'))
      setLoading(false)
      return
    }

    fetch('/api/welcome-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch(() => {})

    setDone(true)
    setTimeout(() => { window.location.href = '/quiz' }, 1500)
  }

  return (
    <div className="page-container">
      <div className="card">
        <h1 style={{ fontSize: '1.375rem', fontWeight: '700', marginBottom: '0.375rem', color: '#ffffff' }}>
          {t(lang, 'signup_title')}
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.75rem' }}>
          {lang === 'en' ? 'Create your profile. The quiz comes next.' : 'Crea tu perfil. El test viene después.'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <input
            className="input-field"
            type="email"
            placeholder={t(lang, 'signup_email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            className="input-field"
            type="password"
            placeholder={t(lang, 'signup_password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          {error && (
            <p style={{ fontSize: '0.875rem', color: '#c4783a' }}>{error}</p>
          )}

          <button className="btn-primary" type="submit" disabled={loading || done}>
            {done
              ? '¡Empezamos! →'
              : loading
              ? (lang === 'en' ? 'Creating account…' : 'Creando cuenta…')
              : (lang === 'en' ? 'Create account →' : 'Crear cuenta →')}
          </button>
        </form>

        <p className="disclaimer" style={{ whiteSpace: 'pre-line' }}>
          {t(lang, 'signup_disclaimer')}
        </p>

        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>
          {t(lang, 'signup_have_account')}{' '}
          <Link href="/login" style={{ color: '#ffffff', fontWeight: '500' }}>
            {t(lang, 'signup_login')}
          </Link>
        </p>
      </div>
    </div>
  )
}
