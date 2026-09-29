import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { AREAS } from '@/lib/areas'

const ADMIN_EMAIL = 'nicola.morea92@gmail.com'

export async function POST() {
  const authSupabase = await createServerClient()
  const { data: { user } } = await authSupabase.auth.getUser()
  if (!user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Leggi i count salvati
  const { data: storedVersions } = await supabase
    .from('area_versions')
    .select('area, teaching_count')

  const storedMap: Record<string, number> = {}
  for (const v of storedVersions ?? []) {
    storedMap[v.area] = v.teaching_count
  }

  // Trova aree con più teachings rispetto al salvato
  const changedAreas = AREAS.filter(area => {
    const stored = storedMap[area.id]
    return stored === undefined || area.teachings.length > stored
  })

  if (changedAreas.length === 0) {
    return NextResponse.json({ sent: 0, message: 'Nessuna area aggiornata da notificare.' })
  }

  // Prendi tutti gli utenti
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
    message: `Notifiche inviate per ${changedAreas.length} aree a ${userIds.length} utenti.`,
  })
}
