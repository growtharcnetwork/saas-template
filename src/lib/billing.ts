// Billing Stub - Stripe Integration (Feature Flagged)

// Feature flag - set to true when ready to enable billing
export const BILLING_ENABLED = process.env.NEXT_PUBLIC_BILLING_ENABLED === 'true'

export type PricingPlan = {
  id: string
  name: string
  description: string
  price: number
  currency: string
  interval: 'month' | 'year'
  features: string[]
  stripePriceId?: string
  popular?: boolean
}

// Pricing plans - customize per product
export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'For individuals getting started',
    price: 0,
    currency: 'USD',
    interval: 'month',
    features: [
      'Up to 3 projects',
      'Basic analytics',
      'Community support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For professionals and small teams',
    price: 29,
    currency: 'USD',
    interval: 'month',
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
    ],
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    price: 99,
    currency: 'USD',
    interval: 'month',
    features: [
      'Everything in Pro',
      'SSO / SAML',
      'Dedicated support',
      'Custom contracts',
      'SLA guarantees',
    ],
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
  },
]

// Subscription status types
export type SubscriptionStatus = 
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'trialing'
  | 'unpaid'

export type Subscription = {
  id: string
  planId: string
  status: SubscriptionStatus
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
}

// Stub functions - implement with Stripe SDK when ready

export async function createCheckoutSession(planId: string, userId: string): Promise<{ url: string | null; error: string | null }> {
  if (!BILLING_ENABLED) {
    return { url: null, error: 'Billing is not enabled' }
  }
  
  // TODO: Implement Stripe checkout session creation
  // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
  // const session = await stripe.checkout.sessions.create({...})
  
  console.log('Creating checkout session for:', { planId, userId })
  return { url: null, error: 'Not implemented - enable Stripe integration' }
}

export async function createCustomerPortalSession(userId: string): Promise<{ url: string | null; error: string | null }> {
  if (!BILLING_ENABLED) {
    return { url: null, error: 'Billing is not enabled' }
  }
  
  // TODO: Implement Stripe customer portal
  // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
  // const session = await stripe.billingPortal.sessions.create({...})
  
  console.log('Creating portal session for:', userId)
  return { url: null, error: 'Not implemented - enable Stripe integration' }
}

export async function getSubscription(userId: string): Promise<Subscription | null> {
  if (!BILLING_ENABLED) {
    // Return free plan by default when billing is disabled
    return {
      id: 'free-default',
      planId: 'free',
      status: 'active',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      cancelAtPeriodEnd: false,
    }
  }
  
  // TODO: Fetch subscription from Supabase/Stripe
  console.log('Getting subscription for:', userId)
  return null
}

export async function cancelSubscription(subscriptionId: string): Promise<{ success: boolean; error: string | null }> {
  if (!BILLING_ENABLED) {
    return { success: false, error: 'Billing is not enabled' }
  }
  
  // TODO: Implement Stripe subscription cancellation
  console.log('Canceling subscription:', subscriptionId)
  return { success: false, error: 'Not implemented' }
}

// Helper to format price
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(price)
}

// Get plan by ID
export function getPlanById(planId: string): PricingPlan | undefined {
  return pricingPlans.find(plan => plan.id === planId)
}
