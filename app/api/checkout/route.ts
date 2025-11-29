import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const resolveBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'You must be logged in to initiate checkout.',
        },
        { status: 401 }
      )
    }

    const body = await request.json().catch(() => ({}))
    const priceId = body?.priceId as string | undefined
    const planId = body?.planId as string | undefined
    const mode = (body?.mode as 'subscription' | 'payment') || 'subscription'

    if (!priceId) {
      return NextResponse.json(
        {
          error: 'Missing priceId',
          message: 'Please provide the Stripe price ID when initiating checkout.',
        },
        { status: 400 }
      )
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY is not configured')
      return NextResponse.json(
        {
          error: 'Stripe not configured',
          message: 'Please set STRIPE_SECRET_KEY in your environment variables.',
        },
        { status: 500 }
      )
    }

    let Stripe
    try {
      Stripe = (await import('stripe')).default
    } catch (error) {
      console.error('Stripe package not installed:', error)
      return NextResponse.json(
        {
          error: 'Stripe package missing',
          message: 'Install the stripe package (npm install stripe) to enable checkout.',
        },
        { status: 500 }
      )
    }

    const stripe = new Stripe(stripeSecretKey)

    const baseUrl = resolveBaseUrl()
    const successUrl =
      process.env.STRIPE_SUCCESS_URL || `${baseUrl}/subscribe?status=success&plan=${planId ?? ''}`
    const cancelUrl =
      process.env.STRIPE_CANCEL_URL || `${baseUrl}/subscribe?status=cancelled&plan=${planId ?? ''}`

    const session = await stripe.checkout.sessions.create({
      mode: mode,
      payment_method_types: ['card'],
      client_reference_id: user.id,
      metadata: {
        userId: user.id,
        planId: planId ?? '',
      },
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    if (!session.url) {
      throw new Error('Stripe did not return a checkout URL.')
    }

    return NextResponse.json({ checkoutUrl: session.url })
  } catch (error) {
    console.error('Failed to create checkout session:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        error: 'Checkout failed',
        message,
      },
      { status: 500 }
    )
  }
}

export function GET() {
  return NextResponse.json(
    {
      error: 'Method not allowed',
      message: 'Use POST to create a checkout session.',
    },
    { status: 405 }
  )
}

