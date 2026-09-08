'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { AREA_MAP, AREA_TITLES_EN } from '@/lib/areas'
import { AREA_MAP_EN } from '@/lib/areas_en'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/i18n'
import type { Area } from '@/types'

const ADMIN_EMAIL = 'nicola.morea92@gmail.com'

interface Profile {
  area_order: Area[]
  quiz_completed: boolean
  paid: boolean
  total_score: number
  advanced_unlocked: boolean
  is_coaching_client: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const { lang } = useLang()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [completedAreas, setCompletedAreas] = useState<Set<string>>(new Set())
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      setUserEmail(user.email ?? null)

      const { data: prof } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!prof || !prof.quiz_completed) { router.push('/onboarding'); return }

      const isAdmin = user.email === ADMIN_EMAIL
      if (!prof.paid && !isAdmin) { router.push('/quiz'); return }

      const { data: levels } = await supabase
        .from('level_progress')
        .select('area')
        .eq('user_id', user.id)

      setCompletedAreas(new Set((levels ?? []).map((l: { area: string }) => l.area)))
      setProfile(prof as Profile)
      setLoading(false)
    }
    load()
  }, [router])

  if (loading) return (
    <div className="page-container">
      <p style={{ color: 'rgba(255,255,255,0.4)' }}>Cargando…</p>
    </div>
  )

  if (!profile) return null

  const areaOrder: Area[] = (profile.area_order ?? []).filter((a: string) => AREA_MAP[a])
  const currentIndex = areaOrder.findIndex((a) => !completedAreas.has(a))
  const currentArea = currentIndex !== -1 ? areaOrder[currentIndex] : null
  const allCompleted = currentIndex === -1
  const isAdmin = userEmail === ADMIN_EMAIL
  const areaTitle = (id: string) => lang === 'en' ? (AREA_TITLES_EN[id] ?? AREA_MAP[id]?.title) : AREA_MAP[id]?.title
  const areaSubtitle = (id: string) => lang === 'en' ? (AREA_MAP_EN[id]?.subtitle ?? AREA_MAP[id]?.subtitle) : AREA_MAP[id]?.subtitle

  return (
    <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '1.375rem', fontWeight: '700', color: '#ffffff' }}>Escúchate</h1>
          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.375rem 0.875rem', background: 'rgba(196,120,58,0.2)', border: '1px solid #c4783a', color: '#c4783a', borderRadius: '9999px', fontSize: '0.8125rem', fontWeight: '600' }}>
            {profile.total_score ?? 0} pts
          </span>
        </div>

        {/* Livello attuale */}
        {allCompleted ? (
          <div className="card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>✦</p>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.5rem' }}>
              {t(lang, 'dash_completed')}
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>
              {t(lang, 'dash_completed_sub')}
            </p>
            {profile.advanced_unlocked ? (
              <Link href="/journey/advanced" className="btn-primary">
                {t(lang, 'dash_advanced')}
              </Link>
            ) : (
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)' }}>
                {t(lang, 'dash_advanced_soon')}
              </p>
            )}
          </div>
        ) : currentArea ? (
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {t(lang, 'dash_level_current')}
            </p>
            <div className="card">
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.375rem' }}>
                {currentIndex + 1} {t(lang, 'dash_level_of')} {areaOrder.length}
              </p>
              <h2 style={{ fontSize: '1.375rem', fontWeight: '700', marginBottom: '0.375rem', color: '#ffffff' }}>
                {areaTitle(currentArea)}
              </h2>
              <p style={{ fontSize: '0.9375rem', color: '#c4783a', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                "{areaSubtitle(currentArea)}"
              </p>
              <Link href={`/journey/${currentArea}`} className="btn-primary">
                {t(lang, 'dash_go_level')}
              </Link>
            </div>
          </div>
        ) : null}

        {/* Lista percorso */}
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {t(lang, 'dash_journey')}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
          {areaOrder.map((areaId, i) => {
            const done = completedAreas.has(areaId)
            const isCurrent = areaId === currentArea
            return (
              <Link key={areaId} href={`/journey/${areaId}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.875rem',
                  padding: '0.75rem 1rem',
                  background: isCurrent ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                  border: `1.5px solid ${isCurrent ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '0.75rem',
                  opacity: done ? 0.5 : 1,
                }}>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', width: '1.25rem', textAlign: 'right', flexShrink: 0 }}>
                    {done ? '✓' : i + 1}
                  </span>
                  <span style={{ fontSize: '0.9375rem', color: '#ffffff', fontWeight: isCurrent ? '500' : '400' }}>
                    {areaTitle(areaId)}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        <Link href="/inicio" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.875rem', textDecoration: 'none', marginBottom: '1rem' }}>
          <div>
            <p style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#ffffff', margin: '0 0 0.2rem' }}>{t(lang, 'dash_start')}</p>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>{t(lang, 'dash_start_sub')}</p>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1rem' }}>→</span>
        </Link>

        <Link href="/muro" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.875rem', textDecoration: 'none', marginBottom: '1rem' }}>
          <div>
            <p style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#ffffff', margin: '0 0 0.2rem' }}>{t(lang, 'dash_wall')}</p>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>{t(lang, 'dash_wall_sub')}</p>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1rem' }}>→</span>
        </Link>

        {profile.is_coaching_client && (
          <Link href="/coaching" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', background: 'rgba(196,120,58,0.08)', border: '1px solid rgba(196,120,58,0.2)', borderRadius: '0.875rem', textDecoration: 'none', marginBottom: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#ffffff', margin: '0 0 0.2rem' }}>{t(lang, 'dash_coaching')}</p>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>{t(lang, 'dash_coaching_sub')}</p>
            </div>
            <span style={{ color: 'rgba(196,120,58,0.7)', fontSize: '1rem' }}>→</span>
          </Link>
        )}

        {isAdmin && (
          <Link href="/admin" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.25rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.875rem', textDecoration: 'none', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{t(lang, 'dash_admin')}</p>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>→</span>
          </Link>
        )}

        <form action="/api/auth/signout" method="post" style={{ textAlign: 'center' }}>
          <button type="submit" className="btn-ghost">
            {t(lang, 'dash_signout')}
          </button>
        </form>
      </div>
    </div>
  )
}
