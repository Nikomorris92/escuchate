'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const ADMIN_EMAIL = 'nicola.morea92@gmail.com'

export default function AdminButton() {
  const pathname = usePathname()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsAdmin(user?.email === ADMIN_EMAIL)
    })
  }, [])

  if (!isAdmin || pathname?.startsWith('/admin')) return null

  return (
    <Link
      href="/admin"
      title="Panel admin"
      style={{
        position: 'fixed',
        top: '0.75rem',
        right: '0.75rem',
        zIndex: 80,
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
  )
}
