import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Menu, X, ArrowRight, Layers, LayoutGrid, Palette, Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Components', href: '#playground', icon: <Layers className="w-4 h-4" /> },
    { label: 'Features', href: '#features', icon: <LayoutGrid className="w-4 h-4" /> },
    { label: 'Design Tokens', href: '#design-tokens', icon: <Palette className="w-4 h-4" /> },
    { label: 'Docs', href: '#docs', icon: <Terminal className="w-4 h-4" /> },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              Lumina <span className="text-indigo-400 font-light">UI</span>
              <Badge variant="primary" size="sm">v1.0</Badge>
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/70 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeSwitcher />
          <Link to="/dashboard">
            <Button
              variant="outline"
              size="sm"
            >
              Dashboard
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="outline"
              size="sm"
            >
              Sign In
            </Button>
          </Link>
          <Button
            variant="glow"
            size="sm"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => {
              const playground = document.getElementById('playground')
              playground?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Explore Kit
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 border-b border-slate-800/80 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
              <ThemeSwitcher />
              <Button
                variant="glow"
                size="sm"
                className="flex-1"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => {
                  setMobileMenuOpen(false)
                  const playground = document.getElementById('playground')
                  playground?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Explore Kit
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
