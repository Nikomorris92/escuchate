'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { AREA_MAP } from '@/lib/areas'
import { AREA_TITLES_EN } from '@/lib/areas'
import { useLang } from '@/lib/LangContext'

interface Reflection {
  id: string
  area: string
  reflection_text: string | null
  created_at: string
}

export default function ReflectionsPage() {
  const router = useRouter()
  const { lang } = useLang()
  const [reflections, setReflections] = useState<Reflection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data } = await supabase
        .from('level_progress')
        .select('id, area, reflection_text, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setReflections(data ?? [])
      setLoading(false)
    }
    load()
  }, [router])

  if (loading) return (
    <div className="page-container">
      <p style={{ color: 'rgba(255,255,255,0.4)' }}>Cargando…</p>
    </div>
  )

  return (
    <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '2.5rem' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <Link href="/dashboard" className="btn-ghost" style={{ display: 'inline-block', marginBottom: '1.5rem', paddingLeft: 0 }}>
          ← {lang === 'en' ? 'Dashboard' : 'Dashboard'}
        </Link>

        <h1 style={{ fontSize: '1.375rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.5rem' }}>
          {lang === 'en' ? 'My reflections' : 'Mis reflexiones'}
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', marginBottom: '2rem' }}>
          {lang === 'en' ? 'Everything you have written along your journey.' : 'Todo lo que has escrito a lo largo de tu recorrido.'}
        </p>

        {reflections.length === 0 ? (
          <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
            {lang === 'en' ? 'No reflections yet. Complete an area to start.' : 'Aún no hay reflexiones. Completa un área para empezar.'}
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {reflections.map((r) => {
              const areaTitle = lang === 'en'
                ? (AREA_TITLES_EN[r.area] ?? AREA_MAP[r.area]?.title ?? r.area)
                : (AREA_MAP[r.area]?.title ?? r.area)
              return (
                <Link key={r.id} href={`/journey/${r.area}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    padding: '1.125rem 1.25rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.875rem',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#c4783a', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {areaTitle}
                      </span>
                      <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.3)' }}>
                        {new Date(r.created_at).toLocaleDateString(lang === 'en' ? 'en-GB' : 'es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    {r.reflection_text ? (
                      <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
                        "{r.reflection_text.length > 200 ? r.reflection_text.slice(0, 200) + '…' : r.reflection_text}"
                      </p>
                    ) : (
                      <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.25)', margin: 0, fontStyle: 'italic' }}>
                        {lang === 'en' ? 'Completed — no reflection saved.' : 'Completado — sin reflexión guardada.'}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
