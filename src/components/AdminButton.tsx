'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLang } from '@/lib/LangContext'

const ADMIN_EMAIL = 'nicola.morea92@gmail.com'

export default function AdminButton() {
  const pathname = usePathname()
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const { lang, setLang } = useLang()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsAdmin(user?.email === ADMIN_EMAIL)
      setEmail(user?.email ?? null)
    })
  }, [])

  if (!email) return null

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <>
      {/* Selettore lingua — in alto a sinistra */}
      <div style={{ position: 'fixed', top: '0.875rem', left: '0.875rem', zIndex: 90, display: 'flex', gap: '0.375rem' }}>
        {(['es', 'en'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            title={l === 'es' ? 'Español' : 'English'}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = lang === l ? '1' : '0.35')}
            style={{ fontSize: '1.375rem', background: 'none', border: 'none', cursor: 'pointer', opacity: lang === l ? 1 : 0.35, transition: 'opacity 0.15s', padding: '0.125rem' }}
          >
            {l === 'es' ? '🇪🇸' : '🇬🇧'}
          </button>
        ))}
      </div>

      {/* Badge email + logout + admin — in alto a destra */}
      <div style={{ position: 'fixed', top: '0.875rem', right: '7.5rem', zIndex: 80, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.25rem 0.625rem', background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', backdropFilter: 'blur(8px)' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
          <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.7)', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {email}
          </span>
        </div>

        <button onClick={handleSignOut} style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0.625rem' }}>
          Cerrar sesión
        </button>

        {isAdmin && !pathname?.startsWith('/admin') && (
          <Link href="/admin" title="Panel admin" style={{ width: '2.25rem', height: '2.25rem', borderRadius: '9999px', background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: '700', fontSize: '0.875rem', textDecoration: 'none', backdropFilter: 'blur(8px)' }}>
            A
          </Link>
        )}
      </div>
    </>
  )
}
