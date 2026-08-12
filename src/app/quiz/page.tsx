'use client'

import { useState } from 'react'
import { QUIZ_QUESTIONS, computeAreaOrder } from '@/lib/quiz'
import { AREA_MAP, AREA_TITLES_EN } from '@/lib/areas'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/i18n'
import type { Area } from '@/types'

type Phase = 'intro' | 'quiz' | 'result'

function areaTitle(areaId: string, lang: ReturnType<typeof useLang>['lang']) {
  return lang === 'en' ? (AREA_TITLES_EN[areaId] ?? AREA_MAP[areaId]?.title) : AREA_MAP[areaId]?.title
}

// Mappa area → chiave feedback in i18n
const FEEDBACK_KEY: Record<string, Parameters<typeof t>[1]> = {
  acceptance: 'quiz_feedback_acceptance',
  discipline: 'quiz_feedback_discipline',
  no_complaining: 'quiz_feedback_no_complaining',
  obstacle: 'quiz_feedback_obstacle',
  leap: 'quiz_feedback_leap',
  gratitude: 'quiz_feedback_gratitude',
  observe: 'quiz_feedback_observe',
  here_now: 'quiz_feedback_here_now',
  voices: 'quiz_feedback_voices',
  mirror: 'quiz_feedback_mirror',
  healthy_relationships: 'quiz_feedback_healthy_relationships',
}

// Domande e opzioni tradotte
function getQuestions(lang: ReturnType<typeof useLang>['lang']) {
  const q = (key: Parameters<typeof t>[1]) => t(lang, key)
  return [
    {
      id: 1,
      area: 'acceptance',
      question: q('quiz_q1'),
      options: [q('quiz_opt_almost_never'), q('quiz_opt_sometimes'), q('quiz_opt_often'), q('quiz_opt_almost_always')],
    },
    {
      id: 2,
      area: 'discipline',
      question: q('quiz_q2'),
      options: [q('quiz_opt_almost_never'), q('quiz_opt_sometimes'), q('quiz_opt_often'), q('quiz_opt_almost_always')],
    },
    {
      id: 3,
      area: 'no_complaining',
      question: q('quiz_q3'),
      options: [q('quiz_opt_almost_never'), q('quiz_opt_sometimes'), q('quiz_opt_often'), q('quiz_opt_almost_always')],
    },
    {
      id: 4,
      area: 'leap',
      question: q('quiz_q4'),
      options: [q('quiz_opt_almost_never'), q('quiz_opt_sometimes'), q('quiz_opt_often'), q('quiz_opt_almost_always')],
    },
    {
      id: 5,
      area: 'gratitude',
      question: q('quiz_q5'),
      options: [q('quiz_opt_nothing'), q('quiz_opt_almost_nothing'), q('quiz_opt_something'), q('quiz_opt_a_lot')],
    },
    {
      id: 6,
      area: 'observe',
      question: q('quiz_q6'),
      options: [q('quiz_opt_almost_never'), q('quiz_opt_sometimes'), q('quiz_opt_often'), q('quiz_opt_almost_always')],
    },
    {
      id: 7,
      area: 'obstacle',
      question: q('quiz_q7'),
      options: [q('quiz_opt_nothing'), q('quiz_opt_little'), q('quiz_opt_quite'), q('quiz_opt_a_lot')],
    },
    {
      id: 8,
      area: 'here_now',
      question: q('quiz_q8'),
      options: [q('quiz_opt_almost_never'), q('quiz_opt_sometimes'), q('quiz_opt_often'), q('quiz_opt_almost_always')],
    },
    {
      id: 9,
      area: 'voices',
      question: q('quiz_q9'),
      options: [q('quiz_opt_nothing'), q('quiz_opt_almost_nothing'), q('quiz_opt_quite'), q('quiz_opt_a_lot')],
    },
    {
      id: 10,
      area: 'mirror',
      question: q('quiz_q10'),
      options: [q('quiz_opt_nothing'), q('quiz_opt_little'), q('quiz_opt_quite'), q('quiz_opt_a_lot')],
    },
    {
      id: 11,
      area: 'healthy_relationships',
      question: q('quiz_q11'),
      options: [q('quiz_opt_nothing'), q('quiz_opt_almost_nothing'), q('quiz_opt_enough'), q('quiz_opt_a_lot')],
    },
  ]
}

export default function QuizPage() {
  const { lang } = useLang()
  const [phase, setPhase] = useState<Phase>('intro')
  const [introText, setIntroText] = useState('')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [areaOrder, setAreaOrder] = useState<Area[]>([])
  const [paying, setPaying] = useState(false)

  const questions = getQuestions(lang)
  const question = questions[currentQ]
  const progress = (currentQ / questions.length) * 100

  function handleAnswer(value: number) {
    const newAnswers = { ...answers, [question.id]: value }
    setAnswers(newAnswers)

    if (currentQ < questions.length - 1) {
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
        // localStorage non disponibile (incognito Safari)
      }
    }
  }

  async function handlePay() {
    setPaying(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ areaOrder, introText }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch {
      setPaying(false)
    }
  }

  /* ── INTRO ── */
  if (phase === 'intro') {
    return (
      <div className="page-container">
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.5rem' }}>
            {t(lang, 'quiz_intro_label')}
          </p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ffffff', lineHeight: '1.4', marginBottom: '1.25rem' }}>
            {t(lang, 'quiz_intro_title')}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.75', marginBottom: '2rem' }}>
            {t(lang, 'quiz_intro_text')}
          </p>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: '0.75rem' }}>
            {t(lang, 'quiz_intro_placeholder_label')}
          </p>
          <textarea
            className="reflection-textarea"
            placeholder={t(lang, 'quiz_intro_placeholder')}
            value={introText}
            onChange={(e) => setIntroText(e.target.value)}
            style={{ minHeight: '140px' }}
          />
          <button
            className="btn-primary"
            style={{ marginTop: '1.5rem' }}
            onClick={() => setPhase('quiz')}
          >
            {t(lang, 'quiz_intro_btn')}
          </button>
          <p className="disclaimer">
            {t(lang, 'quiz_intro_disclaimer')}
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
              {t(lang, 'quiz_result_error')}
            </p>
            <button className="btn-primary" onClick={() => window.location.reload()}>
              {t(lang, 'quiz_result_retry')}
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {t(lang, 'quiz_result_label')}
          </p>

          <h2 style={{ fontSize: '1.375rem', fontWeight: '700', color: '#ffffff', marginBottom: '1.5rem', lineHeight: '1.4' }}>
            {t(lang, 'quiz_result_title')}
          </h2>

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
                    {i === 0 ? t(lang, 'quiz_result_priority1') : `${t(lang, 'quiz_result_priority')} ${i + 1}`}
                  </span>
                </div>
                <p style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#ffffff', margin: '0 0 0.5rem' }}>
                  {areaTitle(areaId, lang)}
                </p>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', lineHeight: '1.65', margin: 0 }}>
                  {FEEDBACK_KEY[areaId] ? t(lang, FEEDBACK_KEY[areaId]) : ''}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '2rem', padding: '1.25rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.875rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {t(lang, 'quiz_result_journey_label')} ({areaOrder.length})
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {areaOrder.map((areaId, i) => (
                <div key={areaId} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: i < 3 ? '#ffffff' : 'rgba(255,255,255,0.4)', fontWeight: i === 0 ? '600' : '400' }}>
                  <span style={{ width: '1.25rem', textAlign: 'right', flexShrink: 0, color: 'rgba(255,255,255,0.3)' }}>{i + 1}.</span>
                  <span>{areaTitle(areaId, lang)}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 0 2rem' }} />

          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.5rem' }}>
            {t(lang, 'quiz_result_cta_title')}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', marginBottom: '1.5rem', lineHeight: '1.65' }}
            dangerouslySetInnerHTML={{ __html: t(lang, 'quiz_result_cta_text').replace('€20.55/year', '<strong style="color:#ffffff">€20.55/year</strong>').replace('€20,55/año', '<strong style="color:#ffffff">€20,55/año</strong>') }}
          />

          <button className="btn-primary" onClick={handlePay} disabled={paying} style={{ width: '100%', marginBottom: '0.75rem' }}>
            {paying ? t(lang, 'quiz_result_cta_loading') : t(lang, 'quiz_result_cta_btn')}
          </button>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
            {t(lang, 'quiz_result_cta_secure')}
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
              {currentQ + 1} / {questions.length}
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
            {t(lang, 'quiz_prev')}
          </button>
        )}
      </div>
    </div>
  )
}
