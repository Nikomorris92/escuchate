'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/i18n'

export default function LoginPage() {
  const router = useRouter()
  const { lang } = useLang()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(t(lang, 'login_error'))
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="page-container">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
        <Image src="/logo-v4.png" alt="Escúchate" width={220} height={220} style={{ objectFit: 'contain' }} />
      </div>
      <div className="card">
        <h1 style={{ fontSize: '1.375rem', fontWeight: '700', marginBottom: '0.375rem', color: '#ffffff' }}>
          {t(lang, 'login_title')}
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.75rem' }}>
          {t(lang, 'login_subtitle')}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <input
            className="input-field"
            type="email"
            placeholder={t(lang, 'login_email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            className="input-field"
            type="password"
            placeholder={t(lang, 'login_password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {error && (
            <p style={{ fontSize: '0.875rem', color: '#c4783a' }}>{error}</p>
          )}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? t(lang, 'login_loading') : t(lang, 'login_submit')}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>
          {t(lang, 'login_no_account')}{' '}
          <Link href="/signup" style={{ color: '#ffffff', fontWeight: '500' }}>
            {t(lang, 'login_create')}
          </Link>
        </p>

        <p style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>
          {t(lang, 'login_forgot')}{' '}
          <Link href="/forgot-password" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {t(lang, 'login_reset')}
          </Link>
        </p>
      </div>
    </div>
  )
}
