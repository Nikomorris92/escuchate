import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AREA_MAP } from '@/lib/areas'
import LogoTopRight from '@/components/LogoTopRight'
import type { Area } from '@/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.quiz_completed) {
    redirect('/onboarding')
  }

  const { data: completedLevels } = await supabase
    .from('level_progress')
    .select('area')
    .eq('user_id', user.id)

  const completedAreas = new Set((completedLevels ?? []).map((l: { area: string }) => l.area))
  const areaOrder: Area[] = (profile.area_order ?? []).filter((a: string) => AREA_MAP[a])
  const currentIndex = areaOrder.findIndex((a) => !completedAreas.has(a))
  const currentArea = currentIndex !== -1 ? areaOrder[currentIndex] : null
  const allCompleted = currentIndex === -1

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
              Has completado tu recorrido
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>
              Vuelve cuando quieras. La plataforma está en constante actualización con nuevos puntos de reflexión.
            </p>
            {profile.advanced_unlocked ? (
              <Link href="/journey/advanced" className="btn-primary">
                Continuar al recorrido avanzado
              </Link>
            ) : (
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)' }}>
                Sigue reflexionando para desbloquear el recorrido avanzado.
              </p>
            )}
          </div>
        ) : currentArea ? (
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Nivel actual
            </p>
            <div className="card">
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.375rem' }}>
                {currentIndex + 1} de {areaOrder.length}
              </p>
              <h2 style={{ fontSize: '1.375rem', fontWeight: '700', marginBottom: '0.375rem', color: '#ffffff' }}>
                {AREA_MAP[currentArea]?.title}
              </h2>
              <p style={{ fontSize: '0.9375rem', color: '#c4783a', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                "{AREA_MAP[currentArea]?.subtitle}"
              </p>
              <Link href={`/journey/${currentArea}`} className="btn-primary">
                Ir al nivel
              </Link>
            </div>
          </div>
        ) : null}

        {/* Lista percorso */}
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Tu recorrido
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
                  cursor: 'pointer',
                }}>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', width: '1.25rem', textAlign: 'right', flexShrink: 0 }}>
                    {done ? '✓' : i + 1}
                  </span>
                  <span style={{ fontSize: '0.9375rem', color: '#ffffff', fontWeight: isCurrent ? '500' : '400' }}>
                    {AREA_MAP[areaId]?.title}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        <Link href="/inicio" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 1.25rem',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '0.875rem',
          textDecoration: 'none',
          marginBottom: '1rem',
        }}>
          <div>
            <p style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#ffffff', margin: '0 0 0.2rem' }}>
              Mi punto de partida
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
              Feedback inicial · Mis reflexiones
            </p>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1rem' }}>→</span>
        </Link>

        <Link href="/muro" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 1.25rem',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '0.875rem',
          textDecoration: 'none',
          marginBottom: '1rem',
        }}>
          <div>
            <p style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#ffffff', margin: '0 0 0.2rem' }}>
              Muro de reflexiones
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
              Lee lo que otros están descubriendo
            </p>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1rem' }}>→</span>
        </Link>

        {profile.is_coaching_client && (
          <Link href="/coaching" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            background: 'rgba(196,120,58,0.08)',
            border: '1px solid rgba(196,120,58,0.2)',
            borderRadius: '0.875rem',
            textDecoration: 'none',
            marginBottom: '1rem',
          }}>
            <div>
              <p style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#ffffff', margin: '0 0 0.2rem' }}>
                Mi progreso — Coaching
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                Puntúa tus áreas y ve tu evolución
              </p>
            </div>
            <span style={{ color: 'rgba(196,120,58,0.7)', fontSize: '1rem' }}>→</span>
          </Link>
        )}

        <form action="/api/auth/signout" method="post" style={{ textAlign: 'center' }}>
          <button type="submit" className="btn-ghost">
            Cerrar sesión
          </button>
        </form>
      </div>
    </div>
  )
}
