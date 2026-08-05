'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
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
