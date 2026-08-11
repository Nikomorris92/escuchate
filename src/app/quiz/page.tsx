'use client'

import { useState } from 'react'
import { QUIZ_QUESTIONS, computeAreaOrder } from '@/lib/quiz'
import { AREA_MAP } from '@/lib/areas'
import { AREA_FEEDBACK } from '@/lib/feedback'
import type { Area } from '@/types'

type Phase = 'intro' | 'quiz' | 'result'

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [introText, setIntroText] = useState('')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [areaOrder, setAreaOrder] = useState<Area[]>([])

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
      try {
        localStorage.setItem('quiz_answers', JSON.stringify(newAnswers))
        localStorage.setItem('quiz_area_order', JSON.stringify(order))
        localStorage.setItem('quiz_intro', introText)
      } catch {
        // localStorage non disponibile (incognito Safari) — i dati rimangono in memoria
      }
    }
  }

  function handlePay() {
    window.location.href = 'https://buy.stripe.com/6oU00igJt65aegI0yN0Ny00'
  }

  /* ── INTRO ── */
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

  /* ── RISULTATI ── */
  if (phase === 'result') {
    const topAreas = areaOrder.slice(0, 3)

    if (topAreas.length === 0) {
      return (
        <div className="page-container">
          <div className="card" style={{ textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>
              Algo ha fallado al calcular tu resultado. Inténtalo de nuevo.
            </p>
            <button className="btn-primary" onClick={() => window.location.reload()}>
              Reintentar
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Lo que vemos en ti
          </p>

          <h2 style={{ fontSize: '1.375rem', fontWeight: '700', color: '#ffffff', marginBottom: '1.5rem', lineHeight: '1.4' }}>
            Estas son las áreas donde más puedes crecer
          </h2>

          {/* Feedback top 3 aree */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {topAreas.map((areaId, i) => (
              <div key={areaId} style={{
                padding: '1.25rem',
                background: i === 0 ? 'rgba(196,120,58,0.12)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${i === 0 ? 'rgba(196,120,58,0.3)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '0.875rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
                  <span style={{
                    fontSize: '0.6875rem', fontWeight: '700', color: i === 0 ? '#c4783a' : 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>
                    {i === 0 ? 'Prioridad 1' : `Prioridad ${i + 1}`}
                  </span>
                </div>
                <p style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#ffffff', margin: '0 0 0.5rem' }}>
                  {AREA_MAP[areaId]?.title}
                </p>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', lineHeight: '1.65', margin: 0 }}>
                  {AREA_FEEDBACK[areaId]}
                </p>
              </div>
            ))}
          </div>

          {/* Percorso completo */}
          <div style={{ marginBottom: '2rem', padding: '1.25rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.875rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Tu recorrido completo ({areaOrder.length} áreas)
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {areaOrder.map((areaId, i) => (
                <div key={areaId} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: i < 3 ? '#ffffff' : 'rgba(255,255,255,0.4)', fontWeight: i === 0 ? '600' : '400' }}>
                  <span style={{ width: '1.25rem', textAlign: 'right', flexShrink: 0, color: 'rgba(255,255,255,0.3)' }}>{i + 1}.</span>
                  <span>{AREA_MAP[areaId]?.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 0 2rem' }} />

          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.5rem' }}>
            ¿Listo para trabajar en ti?
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', marginBottom: '1.5rem', lineHeight: '1.65' }}>
            Accede a tu recorrido personalizado por <strong style={{ color: '#ffffff' }}>€20,55/año</strong> — menos de 2€ al mes.
          </p>

          <button className="btn-primary" onClick={handlePay} style={{ width: '100%', marginBottom: '0.75rem' }}>
            Empezar mi recorrido →
          </button>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
            Pago seguro con Stripe · Cancela cuando quieras
          </p>
        </div>
      </div>
    )
  }

  /* ── QUIZ ── */
  return (
    <div className="page-container">
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>
              {currentQ + 1} / {QUIZ_QUESTIONS.length}
            </span>
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
