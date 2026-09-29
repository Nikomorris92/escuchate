import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { AREAS } from '@/lib/areas'

const ADMIN_EMAIL = 'nicola.morea92@gmail.com'

export async function POST(req: Request) {
  const authSupabase = await createServerClient()
  const { data: { user } } = await authSupabase.auth.getUser()
  if (!user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // force=true: manda notifiche per tutte le aree aggiornate di recente (ignora il count)
  const body = await req.json().catch(() => ({}))
  const forceAreas: string[] = body.areas ?? []

  let targetAreas = AREAS

  if (forceAreas.length > 0) {
    targetAreas = AREAS.filter(a => forceAreas.includes(a.id))
  } else {
    // confronta con area_versions
    const { data: storedVersions } = await supabase
      .from('area_versions')
      .select('area, teaching_count')

    const storedMap: Record<string, number> = {}
    for (const v of storedVersions ?? []) storedMap[v.area] = v.teaching_count

    targetAreas = AREAS.filter(area => {
      const stored = storedMap[area.id]
      return stored === undefined || area.teachings.length > stored
    })
  }

  if (targetAreas.length === 0) {
    return NextResponse.json({ sent: 0, message: 'Nessuna area da notificare.' })
  }

  const { data: profiles } = await supabase.from('user_profiles').select('id')
  const userIds = (profiles ?? []).map((p: { id: string }) => p.id)

  let totalSent = 0
  for (const area of targetAreas) {
    const notifications = userIds.map((userId: string) => ({
      user_id: userId,
      area: area.id,
      message_es: `Nuevo contenido añadido en el área "${area.title}". ¡Vuelve a explorarla!`,
      message_en: `New content added to the "${area.title}" area. Go back and explore it!`,
      read: false,
    }))
    if (notifications.length > 0) {
      await supabase.from('user_notifications').insert(notifications)
      totalSent += notifications.length
    }
    await supabase.from('area_versions').upsert({
      area: area.id,
      teaching_count: area.teachings.length,
      updated_at: new Date().toISOString(),
    })
  }

  return NextResponse.json({
    sent: totalSent,
    areas: targetAreas.map(a => a.title),
    message: `✓ Notifiche inviate per: ${targetAreas.map(a => a.title).join(', ')} (${userIds.length} utenti)`,
  })
}
