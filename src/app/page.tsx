'use client'

import Link from 'next/link'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/i18n'

export default function HomePage() {
  const { lang, setLang } = useLang()

  return (
    <div className="page-container" style={{ background: '#1e3a5f', minHeight: '100dvh' }}>
      {/* Selettore lingua */}
      <div style={{ position: 'fixed', top: '0.875rem', left: '0.875rem', zIndex: 90, display: 'flex', gap: '0.375rem' }}>
        <button
          onClick={() => setLang('es')}
          title="Español"
          style={{
            fontSize: '1.375rem', background: 'none', border: 'none', cursor: 'pointer',
            opacity: lang === 'es' ? 1 : 0.35, transition: 'opacity 0.2s',
            padding: '0.125rem',
          }}
        >
          🇪🇸
        </button>
        <button
          onClick={() => setLang('en')}
          title="English"
          style={{
            fontSize: '1.375rem', background: 'none', border: 'none', cursor: 'pointer',
            opacity: lang === 'en' ? 1 : 0.35, transition: 'opacity 0.2s',
            padding: '0.125rem',
          }}
        >
          🇬🇧
        </button>
      </div>

      <div style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '700', letterSpacing: '-0.03em', marginBottom: '2rem', color: '#ffffff' }}>
          Escúchate
        </h1>

        <blockquote style={{ margin: '0 0 2.5rem', padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.75', fontStyle: 'italic', margin: '0 0 0.75rem' }}>
            {t(lang, 'home_quote')}
          </p>
          <cite style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', fontStyle: 'normal', fontWeight: '500' }}>
            — {t(lang, 'home_author')}
          </cite>
        </blockquote>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <a href="/quiz" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0.875rem 1.5rem', background: '#ffffff', color: '#1e3a5f',
            borderRadius: '0.75rem', fontWeight: '600', fontSize: '0.9375rem',
            textDecoration: 'none',
          }}>
            {t(lang, 'home_start')}
          </a>
          <Link href="/login" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0.625rem 1rem', color: 'rgba(255,255,255,0.6)',
            fontSize: '0.875rem', textDecoration: 'none',
          }}>
            {t(lang, 'home_login')}
          </Link>
        </div>

        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', textAlign: 'center', lineHeight: '1.5', marginTop: '2rem', whiteSpace: 'pre-line' }}>
          {t(lang, 'home_disclaimer')}
        </p>

        <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
          <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.375rem' }}>
            {t(lang, 'home_contact')}
          </p>
          <a href="mailto:escuchateatimismo@gmail.com" style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
            escuchateatimismo@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}
