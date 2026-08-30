import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Shield,
  Bell,
  Palette,
  Key,
  Globe,
  CreditCard,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  ChevronRight,
  Check,
  AlertTriangle,
  Smartphone,
  Moon,
  Sun,
  Monitor,
  ExternalLink,
  Trash2,
  Copy,
  RefreshCw,
  Zap,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

// ─── Toggle switch ───────────────────────────────────────────────────────────
const Toggle: React.FC<{ enabled: boolean; onChange: (v: boolean) => void; label?: string }> = ({
  enabled,
  onChange,
  label,
}) => (
  <div className="flex items-center justify-between">
    {label && <span className="text-sm text-slate-300">{label}</span>}
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        enabled ? 'bg-indigo-600' : 'bg-slate-700'
      }`}
    >
      <motion.span
        className="inline-block h-4 w-4 rounded-full bg-white shadow-sm"
        animate={{ x: enabled ? 22 : 3 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  </div>
)

// ─── Section nav tabs ────────────────────────────────────────────────────────
const SETTINGS_SECTIONS = [
  { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
  { id: 'appearance', label: 'Appearance', icon: <Palette className="w-4 h-4" /> },
  { id: 'api', label: 'API Keys', icon: <Key className="w-4 h-4" /> },
  { id: 'billing', label: 'Billing', icon: <CreditCard className="w-4 h-4" /> },
]

// ─── Profile Section ─────────────────────────────────────────────────────────
const ProfileSection: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-bold text-white mb-1">Profile Information</h3>
      <p className="text-sm text-slate-400">Update your personal details and public profile.</p>
    </div>

    {/* Avatar */}
    <div className="flex items-center gap-5">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-indigo-500/20">
        JD
      </div>
      <div>
        <Button variant="outline" size="sm">Change Avatar</Button>
        <p className="text-[10px] text-slate-500 mt-1.5">JPG, PNG or GIF. Max 2MB.</p>
      </div>
    </div>

    {/* Form fields */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-300">First Name</label>
        <input
          type="text"
          defaultValue="John"
          className="w-full rounded-xl bg-slate-900/80 border border-slate-800 px-4 py-2.5 text-sm text-slate-100 transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-300">Last Name</label>
        <input
          type="text"
          defaultValue="Doe"
          className="w-full rounded-xl bg-slate-900/80 border border-slate-800 px-4 py-2.5 text-sm text-slate-100 transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <label className="text-xs font-medium text-slate-300">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="email"
            defaultValue="john.doe@company.io"
            className="w-full rounded-xl bg-slate-900/80 border border-slate-800 pl-10 pr-4 py-2.5 text-sm text-slate-100 transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <label className="text-xs font-medium text-slate-300">Bio</label>
        <textarea
          rows={3}
          defaultValue="Machine learning engineer passionate about building AI-powered products."
          className="w-full rounded-xl bg-slate-900/80 border border-slate-800 px-4 py-2.5 text-sm text-slate-100 transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-300">Role</label>
        <select className="w-full rounded-xl bg-slate-900/80 border border-slate-800 px-4 py-2.5 text-sm text-slate-100 transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer">
          <option>Admin</option>
          <option>Developer</option>
          <option>Viewer</option>
        </select>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-300">Timezone</label>
        <select className="w-full rounded-xl bg-slate-900/80 border border-slate-800 px-4 py-2.5 text-sm text-slate-100 transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer">
          <option>UTC-5 (Eastern)</option>
          <option>UTC+0 (London)</option>
          <option>UTC+5 (Pakistan)</option>
          <option>UTC+8 (Singapore)</option>
        </select>
      </div>
    </div>

    <div className="flex items-center gap-3 pt-2">
      <Button variant="glow" size="sm" leftIcon={<Save className="w-3.5 h-3.5" />}>
        Save Changes
      </Button>
      <Button variant="ghost" size="sm">Cancel</Button>
    </div>
  </div>
)

// ─── Security Section ────────────────────────────────────────────────────────
const SecuritySection: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [twoFactor, setTwoFactor] = useState(true)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Security Settings</h3>
        <p className="text-sm text-slate-400">Manage your password, two-factor authentication, and active sessions.</p>
      </div>

      {/* Change password */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-200">Change Password</h4>
        <div className="space-y-3 max-w-md">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full rounded-xl bg-slate-900/80 border border-slate-800 pl-10 pr-10 py-2.5 text-sm text-slate-100 transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl bg-slate-900/80 border border-slate-800 pl-10 pr-4 py-2.5 text-sm text-slate-100 transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
          <Button variant="primary" size="sm">Update Password</Button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-800" />

      {/* Two-factor auth */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Two-Factor Authentication</h4>
            <p className="text-xs text-slate-400 mt-0.5 max-w-md">
              Add an extra layer of security by requiring a verification code from your authenticator app.
            </p>
            <Badge variant="success" size="sm" className="mt-2">Enabled</Badge>
          </div>
        </div>
        <Toggle enabled={twoFactor} onChange={setTwoFactor} />
      </div>

      {/* Divider */}
      <div className="border-t border-slate-800" />

      {/* Active sessions */}
      <div>
        <h4 className="text-sm font-semibold text-slate-200 mb-4">Active Sessions</h4>
        <div className="space-y-3">
          {[
            { device: 'Chrome on Windows', location: 'Islamabad, PK', time: 'Current session', current: true },
            { device: 'Safari on iPhone', location: 'Lahore, PK', time: '2h ago', current: false },
            { device: 'Firefox on macOS', location: 'London, UK', time: '1d ago', current: false },
          ].map((session) => (
            <div key={session.device} className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <div className="flex items-center gap-3">
                <Monitor className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-xs font-medium text-slate-200 flex items-center gap-2">
                    {session.device}
                    {session.current && (
                      <Badge variant="success" size="sm">Current</Badge>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {session.location} · {session.time}
                  </div>
                </div>
              </div>
              {!session.current && (
                <button className="text-xs text-rose-400 hover:text-rose-300 transition-colors font-medium">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Notifications Section ───────────────────────────────────────────────────
const NotificationsSection: React.FC = () => {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    weeklyDigest: false,
    modelTraining: true,
    datasetUpdates: true,
    securityAlerts: true,
    marketing: false,
    apiUsage: true,
  })

  const toggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Notification Preferences</h3>
        <p className="text-sm text-slate-400">Configure how and when you receive notifications.</p>
      </div>

      {/* Notification categories */}
      <div className="space-y-1">
        {[
          { key: 'emailAlerts' as const, label: 'Email Alerts', desc: 'Receive important alerts via email', icon: <Mail className="w-4 h-4 text-indigo-400" /> },
          { key: 'pushNotifications' as const, label: 'Push Notifications', desc: 'Browser and mobile push notifications', icon: <Bell className="w-4 h-4 text-purple-400" /> },
          { key: 'weeklyDigest' as const, label: 'Weekly Digest', desc: 'Receive a weekly summary report every Monday', icon: <Globe className="w-4 h-4 text-cyan-400" /> },
          { key: 'modelTraining' as const, label: 'Model Training', desc: 'Notify when training jobs complete or fail', icon: <Zap className="w-4 h-4 text-amber-400" /> },
          { key: 'datasetUpdates' as const, label: 'Dataset Updates', desc: 'Alerts for dataset uploads, syncs, and errors', icon: <RefreshCw className="w-4 h-4 text-emerald-400" /> },
          { key: 'securityAlerts' as const, label: 'Security Alerts', desc: 'Unusual login attempts and session activity', icon: <Shield className="w-4 h-4 text-rose-400" /> },
          { key: 'marketing' as const, label: 'Marketing & Updates', desc: 'Product updates, tips, and promotional content', icon: <ExternalLink className="w-4 h-4 text-slate-400" /> },
          { key: 'apiUsage' as const, label: 'API Usage Alerts', desc: 'Notify when approaching rate limits or quota', icon: <AlertTriangle className="w-4 h-4 text-amber-400" /> },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between py-3.5 px-4 rounded-xl hover:bg-slate-900/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-800/60 border border-slate-700/40 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="text-sm text-slate-200 font-medium">{item.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
              </div>
            </div>
            <Toggle enabled={notifications[item.key]} onChange={() => toggle(item.key)} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Appearance Section ──────────────────────────────────────────────────────
const AppearanceSection: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark')

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Appearance</h3>
        <p className="text-sm text-slate-400">Customize the look and feel of your workspace.</p>
      </div>

      {/* Theme selection */}
      <div>
        <h4 className="text-sm font-semibold text-slate-200 mb-3">Theme</h4>
        <div className="grid grid-cols-3 gap-3 max-w-md">
          {([
            { id: 'dark' as const, label: 'Dark', icon: <Moon className="w-5 h-5" /> },
            { id: 'light' as const, label: 'Light', icon: <Sun className="w-5 h-5" /> },
            { id: 'system' as const, label: 'System', icon: <Monitor className="w-5 h-5" /> },
          ]).map((opt) => (
            <button
              key={opt.id}
              onClick={() => setTheme(opt.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                theme === opt.id
                  ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-400 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'
              }`}
            >
              {opt.icon}
              <span className="text-xs font-medium">{opt.label}</span>
              {theme === opt.id && (
                <Check className="w-3.5 h-3.5 text-indigo-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Color themes reference */}
      <div>
        <h4 className="text-sm font-semibold text-slate-200 mb-3">Color Theme</h4>
        <p className="text-xs text-slate-400 mb-3">Choose a color theme for the application. Use the theme switcher in the landing page for real-time preview.</p>
        <div className="flex gap-2">
          {[
            { name: 'Aurora Indigo', colors: ['#6366f1', '#a855f7'] },
            { name: 'Cyan Horizon', colors: ['#06b6d4', '#0ea5e9'] },
            { name: 'Blue Moon', colors: ['#3b82f6', '#1d4ed8'] },
            { name: 'Rose Gold', colors: ['#f43f5e', '#fb7185'] },
            { name: 'Neon Lime', colors: ['#84cc16', '#22c55e'] },
            { name: 'Solar Amber', colors: ['#f59e0b', '#f97316'] },
          ].map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors cursor-pointer"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ background: `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[1]})` }}
              />
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{t.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Font size */}
      <div>
        <h4 className="text-sm font-semibold text-slate-200 mb-3">Interface Density</h4>
        <div className="flex gap-2 max-w-sm">
          {['Compact', 'Default', 'Comfortable'].map((density) => (
            <button
              key={density}
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                density === 'Default'
                  ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                  : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              {density}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── API Keys Section ────────────────────────────────────────────────────────
const ApiKeysSection: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null)

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const keys = [
    { name: 'Production Key', key: 'lmn_prod_sk_7a8b2c•••••••4f1e', created: 'Aug 12, 2024', lastUsed: '2m ago', status: 'active' },
    { name: 'Development Key', key: 'lmn_dev_sk_3d9e1f•••••••8a2b', created: 'Jul 28, 2024', lastUsed: '1h ago', status: 'active' },
    { name: 'Testing Key', key: 'lmn_test_sk_5c4d7e•••••••2b9a', created: 'Jun 15, 2024', lastUsed: '3d ago', status: 'active' },
    { name: 'Legacy v1 Key', key: 'lmn_v1_sk_8f2a3b•••••••1c4d', created: 'Mar 02, 2024', lastUsed: '30d ago', status: 'expired' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">API Keys</h3>
          <p className="text-sm text-slate-400">Manage your API keys for authentication and integration.</p>
        </div>
        <Button variant="glow" size="sm" leftIcon={<Key className="w-3.5 h-3.5" />}>
          Generate New Key
        </Button>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs text-amber-300 font-medium">Keep your API keys secure</p>
          <p className="text-[10px] text-amber-400/60 mt-0.5">Never share your secret keys in client-side code or public repositories.</p>
        </div>
      </div>

      {/* Keys list */}
      <div className="space-y-3">
        {keys.map((apiKey) => (
          <div
            key={apiKey.name}
            className="flex items-center justify-between py-4 px-5 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-slate-700/60 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
                <Key className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{apiKey.name}</span>
                  <Badge variant={apiKey.status === 'active' ? 'success' : 'default'} size="sm">
                    {apiKey.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <code className="text-[10px] text-slate-500 font-mono">{apiKey.key}</code>
                  <span className="text-[10px] text-slate-600">·</span>
                  <span className="text-[10px] text-slate-600">Created {apiKey.created}</span>
                  <span className="text-[10px] text-slate-600">·</span>
                  <span className="text-[10px] text-slate-600">Last used {apiKey.lastUsed}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => copyKey(apiKey.key)}
                className="p-2 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-colors"
                title="Copy"
              >
                {copied === apiKey.key ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-colors" title="Regenerate">
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              {apiKey.status === 'expired' && (
                <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-rose-400 transition-colors" title="Delete">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Billing Section ─────────────────────────────────────────────────────────
const BillingSection: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-bold text-white mb-1">Billing & Subscription</h3>
      <p className="text-sm text-slate-400">Manage your subscription plan, payment methods, and invoices.</p>
    </div>

    {/* Current plan */}
    <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="glowing" size="sm">Current Plan</Badge>
          </div>
          <h4 className="text-2xl font-bold text-white mb-1">Pro Plan</h4>
          <p className="text-sm text-slate-400">$49/month · Billed monthly</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-white">
            $49<span className="text-sm font-normal text-slate-400">/mo</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Next billing: Sep 15, 2024</p>
        </div>
      </div>

      {/* Plan usage */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[
          { label: 'API Requests', used: '284K', total: '500K', pct: 57 },
          { label: 'Storage', used: '22.4 GB', total: '50 GB', pct: 45 },
          { label: 'Compute Hours', used: '142h', total: '300h', pct: 47 },
        ].map((usage) => (
          <div key={usage.label} className="bg-slate-900/50 rounded-xl p-3 border border-slate-800/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-slate-500 font-medium">{usage.label}</span>
              <span className="text-[10px] text-slate-400 tabular-nums">{usage.pct}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                style={{ width: `${usage.pct}%` }}
              />
            </div>
            <div className="text-xs text-slate-300">
              <span className="font-semibold">{usage.used}</span>
              <span className="text-slate-500"> / {usage.total}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-6">
        <Button variant="outline" size="sm">Change Plan</Button>
        <Button variant="ghost" size="sm" className="text-rose-400 hover:text-rose-300">Cancel Subscription</Button>
      </div>
    </div>

    {/* Payment method */}
    <div>
      <h4 className="text-sm font-semibold text-slate-200 mb-3">Payment Method</h4>
      <div className="flex items-center justify-between py-4 px-5 rounded-xl bg-slate-900/50 border border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-6 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-sm text-slate-200 font-medium">Visa ending in 4242</span>
            <p className="text-[10px] text-slate-500">Expires 12/2026</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">Update</Button>
      </div>
    </div>

    {/* Recent invoices */}
    <div>
      <h4 className="text-sm font-semibold text-slate-200 mb-3">Recent Invoices</h4>
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-400 bg-slate-900/80 border-b border-slate-800">
            <tr>
              <th className="px-5 py-3 font-medium">Invoice</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {[
              { id: 'INV-2024-008', date: 'Aug 15, 2024', amount: '$49.00', status: 'paid' },
              { id: 'INV-2024-007', date: 'Jul 15, 2024', amount: '$49.00', status: 'paid' },
              { id: 'INV-2024-006', date: 'Jun 15, 2024', amount: '$49.00', status: 'paid' },
              { id: 'INV-2024-005', date: 'May 15, 2024', amount: '$29.00', status: 'paid' },
            ].map((invoice) => (
              <tr key={invoice.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-5 py-3 font-mono text-xs text-slate-300">{invoice.id}</td>
                <td className="px-5 py-3 text-xs text-slate-400">{invoice.date}</td>
                <td className="px-5 py-3 text-xs text-slate-200 font-semibold">{invoice.amount}</td>
                <td className="px-5 py-3"><Badge variant="success" size="sm">Paid</Badge></td>
                <td className="px-5 py-3 text-right">
                  <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)

// ═════════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════════════════

const SECTION_COMPONENTS: Record<string, React.FC> = {
  profile: ProfileSection,
  security: SecuritySection,
  notifications: NotificationsSection,
  appearance: AppearanceSection,
  api: ApiKeysSection,
  billing: BillingSection,
}

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile')
  const ActiveComponent = SECTION_COMPONENTS[activeSection]

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Page header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">Settings</h2>
          <p className="text-sm text-slate-400">Manage your account, security, notifications, and workspace preferences.</p>
        </div>

        {/* Two-column layout: Nav + Content */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left nav */}
          <nav className="w-full lg:w-56 flex-shrink-0">
            <div className="lg:sticky lg:top-8 space-y-1">
              {SETTINGS_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                    activeSection === section.id
                      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm shadow-indigo-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  {section.icon}
                  {section.label}
                  {activeSection === section.id && (
                    <ChevronRight className="w-3.5 h-3.5 ml-auto text-indigo-400/60" />
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Right content */}
          <div className="flex-1 min-w-0">
            <Card hoverEffect={false} className="bg-slate-900/60 border-slate-800 shadow-sm">
              <CardContent>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ActiveComponent />
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
