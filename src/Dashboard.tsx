import React from 'react'
import { 
  Home, 
  Files, 
  Settings, 
  BarChart2, 
  BrainCircuit, 
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Link, Outlet, NavLink, useLocation } from 'react-router-dom'
import { Sparkles, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const Dashboard: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex flex-shrink-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-500 shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold tracking-tight text-white">Lumina <span className="font-light text-indigo-400">AI</span></span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <NavItem to="/dashboard" icon={<Home className="w-5 h-5" />} label="Overview" exact />
          <NavItem to="/dashboard/models" icon={<BrainCircuit className="w-5 h-5" />} label="AI Models" />
          <NavItem to="/dashboard/datasets" icon={<Files className="w-5 h-5" />} label="Datasets" />
          <NavItem to="/dashboard/analytics" icon={<BarChart2 className="w-5 h-5" />} label="Analytics" />
          <NavItem to="/dashboard/settings" icon={<Settings className="w-5 h-5" />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
              <span className="text-sm font-medium text-slate-300">JD</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-slate-400">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col relative h-screen overflow-hidden bg-slate-950">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-8 border-b border-slate-800/60 bg-slate-950/50 backdrop-blur-md z-10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-white truncate">AI Processing Workspace</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="success" size="sm" className="hidden sm:inline-flex">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
              System Operational
            </Badge>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                className="fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-50 md:hidden"
              >
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
                  <Link to="/" className="flex items-center gap-2 group" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-500 shadow-lg shadow-indigo-500/20">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold tracking-tight text-white">Lumina <span className="font-light text-indigo-400">AI</span></span>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 -mr-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                  <NavItem to="/dashboard" icon={<Home className="w-5 h-5" />} label="Overview" exact onClick={() => setMobileMenuOpen(false)} />
                  <NavItem to="/dashboard/models" icon={<BrainCircuit className="w-5 h-5" />} label="AI Models" onClick={() => setMobileMenuOpen(false)} />
                  <NavItem to="/dashboard/datasets" icon={<Files className="w-5 h-5" />} label="Datasets" onClick={() => setMobileMenuOpen(false)} />
                  <NavItem to="/dashboard/analytics" icon={<BarChart2 className="w-5 h-5" />} label="Analytics" onClick={() => setMobileMenuOpen(false)} />
                  <NavItem to="/dashboard/settings" icon={<Settings className="w-5 h-5" />} label="Settings" onClick={() => setMobileMenuOpen(false)} />
                </nav>

                <div className="p-4 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                      <span className="text-sm font-medium text-slate-300">JD</span>
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-medium text-white truncate">John Doe</p>
                      <p className="text-xs text-slate-400 truncate">Pro Plan</p>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Workspace Content */}
        <Outlet />
      </main>
    </div>
  )
}

function NavItem({ to, icon, label, exact = false, onClick }: { to: string, icon: React.ReactNode, label: string, exact?: boolean, onClick?: () => void }) {
  const location = useLocation()
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to)

  return (
    <NavLink 
      to={to} 
      onClick={onClick} 
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
        isActive 
          ? 'bg-indigo-500/10 text-indigo-400' 
          : 'text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-800/50'
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </NavLink>
  )
}

export default Dashboard
