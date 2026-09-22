import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const supabaseAnon = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'webhook secret missing' }, { status: 500 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.client_reference_id
    const subscriptionId = session.subscription as string | null

    if (userId) {
      const { error } = await supabaseAnon.rpc('set_user_paid', { p_user_id: userId })
      if (error) console.error('set_user_paid error:', error)
      else console.log('User marked as paid:', userId)

      if (subscriptionId) {
        await supabaseAnon
          .from('user_profiles')
          .update({ stripe_subscription_id: subscriptionId })
          .eq('id', userId)
      }
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription
    await supabaseAnon
      .from('user_profiles')
      .update({ paid: false, stripe_subscription_id: null })
      .eq('stripe_subscription_id', sub.id)
  }

  return NextResponse.json({ received: true })
}
