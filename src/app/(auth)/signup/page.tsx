'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (searchParams.get('payment') === 'success') {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
    }
  }, [searchParams])
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError('Algo ha fallado. Intenta de nuevo.')
      setLoading(false)
      return
    }

    // Se l'utente ha fatto il quiz prima del pagamento, salva i dati
    const quizAreaOrder = localStorage.getItem('quiz_area_order')
    const quizIntro = localStorage.getItem('quiz_intro')

    if (data.user && quizAreaOrder) {
      const areaOrder = JSON.parse(quizAreaOrder)
      await supabase.from('user_profiles').upsert({
        id: data.user.id,
        quiz_completed: true,
        area_order: areaOrder,
        current_level: 0,
        total_score: 0,
        advanced_unlocked: false,
        intro_reflection: quizIntro ?? '',
      })
      localStorage.removeItem('quiz_answers')
      localStorage.removeItem('quiz_area_order')
      localStorage.removeItem('quiz_intro')
      router.push('/dashboard')
    } else {
      router.push('/onboarding')
    }
    router.refresh()
  }

  return (
    <div className="page-container">
      {showSuccess && (
        <div style={{
          position: 'fixed', top: '1.5rem', left: '50%', transform: 'translateX(-50%)',
          zIndex: 100, background: '#1a4a2e', border: '1px solid #4ade80',
          borderRadius: '0.875rem', padding: '1rem 1.5rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          animation: 'fadeIn 0.3s ease',
        }}>
          <span style={{ fontSize: '1.25rem' }}>✓</span>
          <div>
            <p style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#4ade80', margin: 0 }}>
              ¡Suscripción completada con éxito!
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', margin: '0.2rem 0 0' }}>
              Crea tu cuenta para acceder a tu recorrido.
            </p>
          </div>
        </div>
      )}
      <div className="card">
        <h1 style={{ fontSize: '1.375rem', fontWeight: '700', marginBottom: '0.375rem', color: '#ffffff' }}>
          Crea tu cuenta
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.75rem' }}>
          Empieza con 11 preguntas. Dura 2 minutos.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <input
            className="input-field"
            type="email"
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            className="input-field"
            type="password"
            placeholder="Contraseña (mín. 8 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          {error && (
            <p style={{ fontSize: '0.875rem', color: '#c4783a' }}>{error}</p>
          )}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Creando cuenta…' : 'Crear cuenta'}
          </button>
        </form>

        <p className="disclaimer">
          Esta app no es un servicio médico ni terapéutico.<br />
          Si estás siguiendo una terapia o tratamiento, sigue haciéndolo.
        </p>

        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" style={{ color: '#ffffff', fontWeight: '500' }}>
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
