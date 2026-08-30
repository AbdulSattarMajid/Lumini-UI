import React from 'react'
import { motion } from 'framer-motion'
import {
  Palette,
  Sparkles,
  Layers,
  Smartphone,
  Sliders,
  Component,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { FeaturesCanvas } from '@/components/canvas/FeaturesCanvas'

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Palette className="w-5 h-5 text-indigo-400" />,
      tag: 'Design System',
      title: 'Curated Tailwind CSS Styling',
      description:
        'Built with Tailwind CSS v4 with glassmorphism classes, sleek dark-mode palette, glowing mesh gradients, and customizable typography.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      tag: 'Animations',
      title: 'Framer Motion Integrations',
      description:
        'Spring physics, interactive tap and hover feedback, animated dialog transitions, and fluid tab indicators out of the box.',
    },
    {
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      tag: 'Icons & Assets',
      title: 'Lucide React Icon Library',
      description:
        'Over 1,000+ clean, consistent vector icons pre-configured with scalable sizing and stroke matching.',
    },
    {
      icon: <Sliders className="w-5 h-5 text-pink-400" />,
      tag: 'Utility Layer',
      title: 'clsx + tailwind-merge (cn)',
      description:
        'Robust class name merging helper for conditional styles without Tailwind class collision bugs.',
    },
    {
      icon: <Component className="w-5 h-5 text-amber-400" />,
      tag: 'Modularity',
      title: 'Accessible & Reusable UI Kit',
      description:
        'Pre-engineered Button, Card, Modal, Badge, Input, and Tabs ready to copy, customize, or drop into any page.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
      tag: 'Responsiveness',
      title: 'Mobile-First Responsive Flow',
      description:
        'Adaptive layouts designed and tested across mobile screens, tablets, ultra-wide desktops, and touch interactions.',
    },
  ]

  return (
    <section id="features" className="py-24 relative overflow-hidden section-theme-gradient">
      {/* 1. Adjusted canvas opacity to 15% so it acts as a subtle background layer */}
      <FeaturesCanvas className="z-0 opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-3">
            Core Architecture
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineered for Modern Web Experiences
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Every component and utility is crafted with clean separation of concerns, strict TypeScript types, and high visual polish.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              {/* 2. Reinforced glassmorphism Card styling blocks the canvas lines from ruining text contrast */}
              <Card
                hoverEffect
                glowEffect
                className="h-full flex flex-col justify-between text-left bg-slate-950/85 backdrop-blur-xl border border-white/10 shadow-2xl relative z-20"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 w-fit">
                      {feature.icon}
                    </div>
                    <Badge variant="outline" size="sm">
                      {feature.tag}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                  <CardDescription className="pt-2 text-slate-400">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}