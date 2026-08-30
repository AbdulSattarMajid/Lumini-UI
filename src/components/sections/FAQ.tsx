import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import { FAQCanvas } from '@/components/canvas/FAQCanvas'

const faqs = [
  {
    question: 'Is Lumina UI free to use?',
    answer: 'Yes, the core Lumina UI template is open-source and free to use for personal and commercial projects under the MIT license.',
  },
  {
    question: 'Do I need to know Framer Motion to use this?',
    answer: 'Basic knowledge of React is enough. The complex Framer Motion physics and animations are abstracted into our reusable components, so you get the benefits out of the box without the learning curve.',
  },
  {
    question: 'Can I use this with Next.js or Remix?',
    answer: 'Absolutely! While this template is initialized with Vite, all the UI components in the src/components folder are standard React components that can be dropped into any React framework including Next.js and Remix.',
  },
  {
    question: 'How do I customize the theme colors?',
    answer: 'All theme colors are defined as CSS variables in src/index.css and mapped in the Tailwind configuration. You can easily tweak the hex codes to match your brand identity.',
  },
]

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 relative section-theme-gradient border-t border-slate-800 overflow-hidden">
      <FAQCanvas className="z-0 opacity-15" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-3">
            FAQ
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-2xl bg-slate-950/85 overflow-hidden backdrop-blur-xl transition-colors hover:border-white/20 shadow-2xl relative z-20"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-slate-200">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 transition-transform duration-300',
                    openIndex === index ? 'rotate-180 text-indigo-400' : 'text-slate-500'
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
