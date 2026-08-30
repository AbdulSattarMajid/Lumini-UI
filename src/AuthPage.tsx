import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Link, useNavigate } from 'react-router-dom'
import { InteractiveCanvas } from '@/components/InteractiveCanvas'

export const AuthPage: React.FC = () => {
  const navigate = useNavigate()

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="min-h-screen flex bg-slate-950 text-slate-100"
    >
      {/* Left Column: Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative z-10">
        {/* Back Link */}
        <div className="absolute top-8 left-8 sm:left-16 lg:left-24">
          <Link to="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              Welcome back
            </h1>
            <p className="text-slate-400">
              Log in to your account to continue building amazing things.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSignIn}>
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              leftIcon={<Mail className="w-4 h-4" />}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
            />
            
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input type="checkbox" className="rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-950" />
                Remember me
              </label>
              <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                Forgot password?
              </a>
            </div>

            <Button type="submit" variant="glow" className="w-full mt-2" size="lg">
              Sign In
            </Button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="px-4 text-xs text-slate-500 uppercase tracking-wider font-semibold">Or continue with</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" leftIcon={<GithubIcon className="w-5 h-5" />}>
              GitHub
            </Button>
            <Button variant="outline" leftIcon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            }>
              Google
            </Button>
          </div>

          <p className="mt-10 text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-white hover:text-indigo-300 transition-colors font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Column: Visual Aesthetics */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 border-l border-slate-800 overflow-hidden items-center justify-center">
        {/* 3D Interactive Background */}
        <div className="absolute inset-0 z-0">
          <InteractiveCanvas className="opacity-80 mix-blend-screen" />
        </div>
        
        {/* Floating Glass Element */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="relative z-10 glass-card p-10 rounded-3xl max-w-sm mx-auto backdrop-blur-2xl border-white/10"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mb-6 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Secure & Seamless</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Experience the next generation of authentication interfaces. Built with Framer Motion, Tailwind CSS, and precise attention to detail.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AuthPage
