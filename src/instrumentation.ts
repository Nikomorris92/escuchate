export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const { AREAS } = await import('@/lib/areas')

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Leggi i count attuali dal DB
    const { data: storedVersions } = await supabase
      .from('area_versions')
      .select('area, teaching_count')

    const storedMap: Record<string, number> = {}
    for (const v of storedVersions ?? []) {
      storedMap[v.area] = v.teaching_count
    }

    // Confronta con i count attuali nel codice
    const changedAreas: typeof AREAS = []
    for (const area of AREAS) {
      const currentCount = area.teachings.length
      const storedCount = storedMap[area.id]
      if (storedCount !== undefined && currentCount > storedCount) {
        changedAreas.push(area)
      }
    }

    if (changedAreas.length === 0) {
      // Inizializza i count se non esistono ancora
      for (const area of AREAS) {
        if (storedMap[area.id] === undefined) {
          await supabase.from('area_versions').upsert({
            area: area.id,
            teaching_count: area.teachings.length,
            updated_at: new Date().toISOString(),
          })
        }
      }
      return
    }

    // Prendi tutti gli utenti registrati
    const { data: profiles } = await supabase
      .from('user_profiles')
      .select('id')

    const userIds = (profiles ?? []).map((p: { id: string }) => p.id)

    // Crea notifiche per ogni utente per ogni area cambiata
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
      }

      // Aggiorna il count salvato
      await supabase.from('area_versions').upsert({
        area: area.id,
        teaching_count: area.teachings.length,
        updated_at: new Date().toISOString(),
      })
    }

    console.log(`[instrumentation] Notifiche inviate per ${changedAreas.length} aree aggiornate.`)
  } catch (e) {
    console.error('[instrumentation] Errore check area versions:', e)
  }
}
