import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Star, Quote } from 'lucide-react'
import { TestimonialsCanvas } from '@/components/canvas/TestimonialsCanvas'

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Frontend Engineer @ TechCorp',
    content: 'Lumina UI completely transformed our workflow. We were able to ship our new dashboard in half the time thanks to the pre-built components and animations.',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'Lead Designer @ CreativeStudio',
    content: 'The attention to detail in the design tokens and framer-motion physics is unparalleled. It truly feels like a premium product out of the box.',
    rating: 5,
  },
  {
    name: 'Emily Rivera',
    role: 'Startup Founder',
    content: 'I needed a landing page that looked modern and fast. Lumina UI delivered on both fronts. The glassmorphism effects are absolutely stunning.',
    rating: 5,
  },
]

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 relative section-theme-gradient border-t border-slate-800 overflow-hidden">
      <TestimonialsCanvas className="z-0 opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="success" className="mb-3">
            Social Proof
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Loved by Developers & Designers
          </h2>
          <p className="mt-4 text-base text-slate-400">
            See what our community has to say about building with Lumina UI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card hoverEffect className="h-full flex flex-col justify-between bg-slate-950/85 backdrop-blur-xl border border-white/10 shadow-2xl relative z-20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-slate-700/50 absolute top-6 right-6" />
                  <CardContent className="px-0 py-0 pb-4">
                    <p className="text-slate-300 italic">"{testimonial.content}"</p>
                  </CardContent>
                </CardHeader>
                <div className="pt-4 border-t border-slate-800/80">
                  <CardTitle className="text-base text-white">{testimonial.name}</CardTitle>
                  <CardDescription className="text-xs text-slate-400">{testimonial.role}</CardDescription>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
