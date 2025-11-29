import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-11-17.clover',
    typescript: true,
})

const getSupabaseAdmin = () => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error('Supabase URL or Service Role Key is missing')
    }
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    )
}

export async function POST(req: Request) {
    const body = await req.text()
    const signature = (await headers()).get('Stripe-Signature') as string

    let event: Stripe.Event

    try {
        if (!process.env.STRIPE_WEBHOOK_SECRET) {
            throw new Error('STRIPE_WEBHOOK_SECRET is not set')
        }
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        console.error('Webhook signature verification failed:', error)
        return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session

    if (event.type === 'checkout.session.completed') {
        const userId = session.metadata?.userId
        const planId = session.metadata?.planId

        if (userId) {
            try {
                // Update user metadata in Supabase
                const { error } = await getSupabaseAdmin().auth.admin.updateUserById(userId, {
                    user_metadata: {
                        is_paid: true,
                        plan: planId || 'pro',
                        stripe_customer_id: session.customer,
                        stripe_subscription_id: session.subscription,
                    },
                })

                if (error) {
                    console.error('Error updating user metadata:', error)
                    return NextResponse.json({ error: 'Error updating user' }, { status: 500 })
                }

                console.log(`Successfully updated user ${userId} status to paid`)
            } catch (err) {
                console.error('Error updating user in Supabase:', err)
                return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
            }
        }
    }

    return NextResponse.json({ received: true })
}
