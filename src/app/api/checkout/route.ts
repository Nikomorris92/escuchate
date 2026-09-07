import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const PRICE_ID = 'price_1UD77lR6e8ic7E11V8UMhrbD'

export async function POST(_request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: PRICE_ID, quantity: 1 }],
    success_url: `https://www.escuchateati.com/dashboard`,
    cancel_url: `https://www.escuchateati.com/quiz`,
    allow_promotion_codes: true,
    client_reference_id: user.id,
    customer_email: user.email,
  })

  return NextResponse.json({ url: session.url })
}
