'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const ADMIN_EMAIL = 'nicola.morea92@gmail.com'

export default function AdminButton() {
  const pathname = usePathname()
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsAdmin(user?.email === ADMIN_EMAIL)
      setEmail(user?.email ?? null)
    })
  }, [])

  // Non mostrare nulla su pagine auth o se non loggato
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/signup')
  if (isAuthPage || !email) return null

  return (
    <div style={{
      position: 'fixed',
      top: '0.875rem',
      right: isAdmin ? '0.75rem' : '6rem',
      zIndex: 80,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    }}>
      {/* Email badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.25rem 0.625rem',
        background: 'rgba(0,0,0,0.35)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '9999px',
        backdropFilter: 'blur(8px)',
      }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
        <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.7)', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {email}
        </span>
      </div>

      {/* Bottone A solo per admin */}
      {isAdmin && !pathname?.startsWith('/admin') && (
        <Link
          href="/admin"
          title="Panel admin"
          style={{
            width: '2.25rem',
            height: '2.25rem',
            borderRadius: '9999px',
            background: 'rgba(255,255,255,0.15)',
            border: '1.5px solid rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '0.875rem',
            textDecoration: 'none',
            backdropFilter: 'blur(8px)',
          }}
        >
          A
        </Link>
      )}
    </div>
  )
}
