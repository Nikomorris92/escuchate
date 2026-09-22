import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('stripe_subscription_id')
    .eq('id', user.id)
    .single()

  if (!profile?.stripe_subscription_id) {
    return NextResponse.json({ error: 'No subscription found' }, { status: 400 })
  }

  await stripe.subscriptions.update(profile.stripe_subscription_id, {
    cancel_at_period_end: true,
  })

  return NextResponse.json({ success: true })
}
