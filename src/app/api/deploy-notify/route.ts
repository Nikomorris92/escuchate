import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { AREAS } from '@/lib/areas'

export async function POST(req: Request) {
  const token = req.headers.get('x-deploy-token')
  if (token !== process.env.DEPLOY_NOTIFY_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: storedVersions } = await supabase
    .from('area_versions')
    .select('area, teaching_count')

  const storedMap: Record<string, number> = {}
  for (const v of storedVersions ?? []) storedMap[v.area] = v.teaching_count

  const debugInfo = AREAS.map(area => ({
    id: area.id,
    stored: storedMap[area.id] ?? 'NOT_IN_DB',
    current: area.teachings.length,
    changed: storedMap[area.id] === undefined || area.teachings.length > (storedMap[area.id] ?? 0),
  }))

  const changedAreas = AREAS.filter(area => {
    const stored = storedMap[area.id]
    return stored === undefined || area.teachings.length > stored
  })

  if (changedAreas.length === 0) {
    for (const area of AREAS) {
      await supabase.from('area_versions').upsert({
        area: area.id,
        teaching_count: area.teachings.length,
        updated_at: new Date().toISOString(),
      })
    }
    return NextResponse.json({ sent: 0, message: 'Nessuna area da notificare — counts aggiornati.', debug: debugInfo })
  }

  const { data: profiles } = await supabase.from('user_profiles').select('id')
  const userIds = (profiles ?? []).map((p: { id: string }) => p.id)

  let totalSent = 0
  for (const area of changedAreas) {
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
    areas: changedAreas.map(a => a.title),
  })
}
