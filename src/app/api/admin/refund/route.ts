import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const ADMIN_EMAIL = 'nicola.morea92@gmail.com'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { chargeId } = await request.json()
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  try {
    const refund = await stripe.refunds.create({ charge: chargeId })
    return NextResponse.json({ success: true, refund })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
