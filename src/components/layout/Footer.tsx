import React, { useState } from 'react'
import { Sparkles, Send, CheckCircle2 } from 'lucide-react'
import { GithubIcon, TwitterIcon, LinkedinIcon } from '@/components/icons/BrandIcons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 4000)
      setEmail('')
    }
  }

  return (
    <footer className="border-t border-slate-850 bg-slate-950/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-850">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-500 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Lumina <span className="text-indigo-400 font-light">UI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              A high-end, production-ready frontend UI kit built with React, Vite, Tailwind CSS, Framer Motion, and Lucide icons.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-left space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#playground" className="hover:text-indigo-400 transition-colors">Component Library</a></li>
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Architecture</a></li>
              <li><a href="#design-tokens" className="hover:text-indigo-400 transition-colors">Design Tokens</a></li>
              <li><a href="https://tailwindcss.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Tailwind CSS</a></li>
              <li><a href="https://motion.dev" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Framer Motion</a></li>
            </ul>
          </div>

          {/* Newsletter / Updates */}
          <div className="text-left space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Stay Updated</h4>
            <p className="text-xs text-slate-400">Get notified when new components, themes, and template patterns drop.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900 text-xs py-2"
                  required
                />
                <Button type="submit" size="sm" variant="primary" className="shrink-0">
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed successfully!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Lumina UI. Crafted with React, Vite & Tailwind CSS.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">MIT License</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
