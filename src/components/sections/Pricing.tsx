import React from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { PricingCanvas } from '@/components/canvas/PricingCanvas'

const pricingPlans = [
  {
    name: 'Hobby',
    price: '$0',
    description: 'Perfect for side projects and learning.',
    features: ['Access to basic components', 'Community support', '1 Project', 'Basic animations'],
    missing: ['Premium components', 'Priority support', 'Custom themes'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For professional developers building real apps.',
    features: ['All basic features', 'Premium components', 'Priority support', 'Unlimited projects', 'Advanced GSAP animations', 'Custom themes'],
    missing: [],
    cta: 'Upgrade to Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    description: 'For teams needing dedicated support and scale.',
    features: ['All Pro features', 'Dedicated account manager', 'Custom component requests', 'SLA guarantees', 'Team training'],
    missing: [],
    cta: 'Contact Sales',
    popular: false,
  },
]

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden section-theme-gradient">
      <PricingCanvas />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-3">
            Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Choose the plan that fits your needs. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex"
            >
              <Card
                glowEffect={plan.popular}
                hoverEffect
                className={cn(
                  'w-full flex flex-col bg-slate-950/85 backdrop-blur-xl border-white/10 shadow-2xl relative z-20',
                  plan.popular ? 'border-indigo-500/50 shadow-indigo-500/10 scale-105 z-30' : ''
                )}
              >
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    {plan.popular && <Badge variant="glowing" size="sm">Most Popular</Badge>}
                  </div>
                  <div className="flex items-baseline gap-1 mt-2 mb-4">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-sm text-slate-400">/month</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-3 mt-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                  {plan.missing.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 opacity-50">
                      <X className="w-5 h-5 text-slate-500 shrink-0" />
                      <span className="text-sm text-slate-400 line-through">{feature}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pt-6 mt-auto">
                  <Button
                    variant={plan.popular ? 'glow' : 'outline'}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
