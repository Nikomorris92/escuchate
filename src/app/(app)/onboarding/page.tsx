'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QUIZ_QUESTIONS, computeAreaOrder } from '@/lib/quiz'
import { AREA_MAP } from '@/lib/areas'
import { generateFeedback } from '@/lib/feedback'
import { createClient } from '@/lib/supabase/client'
import type { Area } from '@/types'

type Phase = 'intro' | 'quiz' | 'result'

export default function OnboardingPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('intro')
  const [introText, setIntroText] = useState('')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [areaOrder, setAreaOrder] = useState<Area[]>([])
  const [saving, setSaving] = useState(false)

  const question = QUIZ_QUESTIONS[currentQ]
  const progress = (currentQ / QUIZ_QUESTIONS.length) * 100

  function handleAnswer(value: number) {
    const newAnswers = { ...answers, [question.id]: value }
    setAnswers(newAnswers)

    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      const order = computeAreaOrder(newAnswers) as Area[]
      setAreaOrder(order)
      setPhase('result')
    }
  }

  async function handleStart() {
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('user_profiles').upsert({
      id: user.id,
      quiz_completed: true,
      area_order: areaOrder,
      current_level: 0,
      total_score: 0,
      advanced_unlocked: false,
      intro_reflection: introText,
    })

    router.push('/journey')
  }

  /* ── FASE: INTRO ── */
  if (phase === 'intro') {
    return (
      <div className="page-container">
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.5rem' }}>
            Antes de empezar
          </p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ffffff', lineHeight: '1.4', marginBottom: '1.25rem' }}>
            ¿Cómo te hablas a ti mismo?
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.75', marginBottom: '2rem' }}>
            Las palabras que usas contigo mismo, en silencio, cada día — ¿son las de un amigo, o las de un juez?{' '}
            Todo lo que encontrarás aquí parte de esta relación: la que tienes contigo mismo.
          </p>

          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: '0.75rem' }}>
            Escribe, con tus palabras, cómo te hablas a ti mismo cuando algo va mal.
          </p>
          <textarea
            className="reflection-textarea"
            placeholder="Sin límite de palabras. Esto es solo tuyo."
            value={introText}
            onChange={(e) => setIntroText(e.target.value)}
            style={{ minHeight: '140px' }}
          />

          <button
            className="btn-primary"
            style={{ marginTop: '1.5rem' }}
            onClick={() => setPhase('quiz')}
          >
            Continuar al cuestionario →
          </button>

          <p className="disclaimer">
            Esta reflexión se guardará y podrás releerla más adelante para ver cómo has cambiado.
          </p>
        </div>
      </div>
    )
  }

  if (phase === 'result') {
    const startArea = AREA_MAP[areaOrder[0]]
    const feedback = generateFeedback(answers, areaOrder)
    const feedbackLines = feedback.split('\n\n').filter(Boolean)

    return (
      <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Lo que vemos
          </p>

          {/* Feedback personalizzato */}
          <div style={{ marginBottom: '2rem' }}>
            {feedbackLines.map((line, i) => (
              <p key={i} style={{
                fontSize: '1.0625rem',
                color: '#ffffff',
                lineHeight: '1.75',
                marginBottom: i < feedbackLines.length - 1 ? '1rem' : 0,
              }}>
                {line}
              </p>
            ))}
          </div>

          {/* Separatore */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '2rem 0' }} />

          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Tu punto de partida
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.375rem' }}>
            {startArea.title}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: '#c4783a', fontStyle: 'italic', marginBottom: '1.5rem' }}>
            "{startArea.subtitle}"
          </p>

          <div style={{ marginBottom: '2rem', padding: '1.25rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.75rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Tu orden completo
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {areaOrder.map((areaId, i) => (
                <div key={areaId} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: i === 0 ? '#ffffff' : 'rgba(255,255,255,0.45)', fontWeight: i === 0 ? '600' : '400' }}>
                  <span style={{ width: '1.25rem', textAlign: 'right', flexShrink: 0, color: 'rgba(255,255,255,0.3)' }}>{i + 1}.</span>
                  <span>{AREA_MAP[areaId]?.title}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="btn-primary" onClick={handleStart} disabled={saving}>
            {saving ? 'Guardando…' : 'Empezar el recorrido'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>
              {currentQ + 1} / {QUIZ_QUESTIONS.length}
            </span>
            <button className="btn-ghost" style={{ padding: '0.25rem 0' }} onClick={() => router.push('/')}>
              Salir
            </button>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <h2 style={{ fontSize: '1.0625rem', fontWeight: '500', color: '#ffffff', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          {question.question}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {question.options.map((option, i) => (
            <button
              key={i}
              className={`quiz-option${answers[question.id] === i ? ' selected' : ''}`}
              onClick={() => handleAnswer(i)}
            >
              {option}
            </button>
          ))}
        </div>

        {currentQ > 0 && (
          <button className="btn-ghost" style={{ width: '100%', marginTop: '1rem' }} onClick={() => setCurrentQ(currentQ - 1)}>
            ← Anterior
          </button>
        )}
      </div>
    </div>
  )
}
