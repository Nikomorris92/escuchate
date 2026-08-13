'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LogoTopRight() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setEmail(user?.email ?? null)
    })
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: '0.75rem',
      right: '0.75rem',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    }}>
      {email && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          padding: '0.25rem 0.625rem',
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '9999px',
          backdropFilter: 'blur(8px)',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#4ade80', flexShrink: 0,
          }} />
          <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.7)', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {email}
          </span>
        </div>
      )}
      <Image src="/logo.png" alt="Escúchate" width={52} height={52} style={{ objectFit: 'contain' }} />
    </div>
  )
}
