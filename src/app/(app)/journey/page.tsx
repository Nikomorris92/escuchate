import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Area } from '@/types'

export default async function JourneyRedirectPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('area_order')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/onboarding')

  const { data: completed } = await supabase
    .from('level_progress')
    .select('area')
    .eq('user_id', user.id)

  const completedAreas = new Set((completed ?? []).map((l: { area: string }) => l.area))
  const areaOrder: Area[] = profile.area_order ?? []
  const nextArea = areaOrder.find((a) => !completedAreas.has(a))

  if (nextArea) {
    redirect(`/journey/${nextArea}`)
  } else {
    redirect('/dashboard')
  }
}
