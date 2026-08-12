'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/i18n'

function SuccessBanner() {
  const { lang } = useLang()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('payment') === 'success') {
      setShow(true)
      setTimeout(() => setShow(false), 5000)
    }
  }, [])

  if (!show) return null

  return (
    <div style={{
      position: 'fixed', top: '1.5rem', left: '50%', transform: 'translateX(-50%)',
      zIndex: 100, background: '#1a4a2e', border: '1px solid #4ade80',
      borderRadius: '0.875rem', padding: '1rem 1.5rem',
      display: 'flex', alignItems: 'center', gap: '0.75rem',
      boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ fontSize: '1.25rem' }}>✓</span>
      <div>
        <p style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#4ade80', margin: 0 }}>
          {t(lang, 'signup_success')}
        </p>
        <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', margin: '0.2rem 0 0' }}>
          {t(lang, 'signup_success_sub')}
        </p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  const router = useRouter()
  const { lang } = useLang()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fromQuiz, setFromQuiz] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setFromQuiz(params.get('from') === 'quiz')
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError(t(lang, 'signup_error_short'))
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { data, error: signupError } = await supabase.auth.signUp({ email, password })

    if (signupError || !data.user) {
      setError(t(lang, 'signup_error'))
      setLoading(false)
      return
    }

    fetch('/api/welcome-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch(() => {})

    // Legge dati quiz da localStorage
    let areaOrder: string[] | null = null
    let quizIntro = ''
    try {
      const stored = localStorage.getItem('quiz_area_order')
      if (stored) {
        areaOrder = JSON.parse(stored)
        quizIntro = localStorage.getItem('quiz_intro') ?? ''
      }
    } catch { /* incognito */ }

    if (areaOrder) {
      await supabase.from('user_profiles').upsert({
        id: data.user.id,
        quiz_completed: true,
        area_order: areaOrder,
        current_level: 0,
        total_score: 0,
        advanced_unlocked: false,
        intro_reflection: quizIntro,
      })
      try {
        localStorage.removeItem('quiz_answers')
        localStorage.removeItem('quiz_area_order')
        localStorage.removeItem('quiz_intro')
      } catch { /* incognito */ }

      // Se viene dal quiz, vai alla pagina checkout (sessione già stabile lì)
      if (fromQuiz) {
        router.push('/checkout')
        return
      }

      router.push('/dashboard')
    } else {
      router.push('/onboarding')
    }
    router.refresh()
  }

  return (
    <div className="page-container">
      <Suspense fallback={null}>
        <SuccessBanner />
      </Suspense>
      <div className="card">
        <h1 style={{ fontSize: '1.375rem', fontWeight: '700', marginBottom: '0.375rem', color: '#ffffff' }}>
          {t(lang, 'signup_title')}
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.75rem' }}>
          {fromQuiz
            ? (lang === 'en' ? 'Create your account to access your personalized journey.' : 'Crea tu cuenta para acceder a tu recorrido personalizado.')
            : t(lang, 'signup_subtitle')}
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

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading
              ? (lang === 'en' ? 'Creating account…' : 'Creando cuenta…')
              : (fromQuiz
                ? (lang === 'en' ? 'Create account and pay →' : 'Crear cuenta y pagar →')
                : t(lang, 'signup_submit'))}
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
