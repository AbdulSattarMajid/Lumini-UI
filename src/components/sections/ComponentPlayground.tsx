import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Check,
  Copy,
  Send,
  Search,
  Lock,
  Mail,
  User,
  ExternalLink,
  ShieldAlert,
  Zap,
  Activity,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Tabs } from '@/components/ui/Tabs'
import { PlaygroundCanvas } from '@/components/canvas/PlaygroundCanvas'

export const ComponentPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState('buttons')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null)

  // Interactive form states
  const [formName, setFormName] = useState('Alex Rivera')
  const [formEmail, setFormEmail] = useState('alex@example.com')
  const [hasError, setHasError] = useState(false)

  const playgroundTabs = [
    { id: 'buttons', label: 'Buttons', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'badges', label: 'Badges & Dots', icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'inputs', label: 'Form Controls', icon: <Mail className="w-3.5 h-3.5" /> },
    { id: 'cards', label: 'Cards & Modals', icon: <Layers className="w-3.5 h-3.5" /> },
  ]

  const handleCopy = (snippet: string, key: string) => {
    navigator.clipboard.writeText(snippet)
    setCopiedSnippet(key)
    setTimeout(() => setCopiedSnippet(null), 2000)
  }

  return (
    <section id="playground" className="py-24 relative section-theme-gradient border-t border-slate-850 overflow-hidden">
      <PlaygroundCanvas />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="glowing" className="mb-3">
            Interactive Workbench
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Component Showcase & Playground
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Test all built-in UI components, spring physics, hover states, and variant configurations in real time.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <Tabs tabs={playgroundTabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {/* Dynamic Workbench Container */}
        <div className="max-w-5xl mx-auto">
          {/* BUTTONS PANEL */}
          {activeTab === 'buttons' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 text-left relative z-20"
            >
              <Card className="bg-slate-950/85 backdrop-blur-xl border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                  <CardDescription>
                    Custom buttons with built-in Framer Motion tap scale, hover spring, and loading states.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button variant="primary">Primary</Button>
                    <Button variant="glow" rightIcon={<Sparkles className="w-4 h-4" />}>
                      Glow Gradient
                    </Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger" leftIcon={<ShieldAlert className="w-4 h-4" />}>
                      Danger
                    </Button>
                  </div>

                  <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm" variant="primary">
                        Small
                      </Button>
                      <Button size="md" variant="primary">
                        Medium
                      </Button>
                      <Button size="lg" variant="primary">
                        Large
                      </Button>
                    </div>

                    <Button
                      variant="outline"
                      isLoading={btnLoading}
                      onClick={() => {
                        setBtnLoading(true)
                        setTimeout(() => setBtnLoading(false), 2000)
                      }}
                    >
                      {btnLoading ? 'Processing...' : 'Click for Async Spinner'}
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    import &#123; Button &#125; from '@/components/ui/Button'
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    leftIcon={
                      copiedSnippet === 'btn' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )
                    }
                    onClick={() =>
                      handleCopy(
                        `<Button variant="glow" rightIcon={<Sparkles className="w-4 h-4" />}>Explore</Button>`,
                        'btn'
                      )
                    }
                  >
                    {copiedSnippet === 'btn' ? 'Copied' : 'Copy JSX'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {/* BADGES PANEL */}
          {activeTab === 'badges' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 text-left relative z-20"
            >
              <Card className="bg-slate-950/85 backdrop-blur-xl border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle>Badge Indicators & Tags</CardTitle>
                  <CardDescription>
                    Pill badges for status indicators, changelogs, version numbers, and notification counts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="primary" dot>
                      Primary Live
                    </Badge>
                    <Badge variant="success" dot>
                      System Online
                    </Badge>
                    <Badge variant="warning" dot>
                      Pending Review
                    </Badge>
                    <Badge variant="danger" dot>
                      Incident
                    </Badge>
                    <Badge variant="outline">Outline Tag</Badge>
                    <Badge variant="glowing" dot>
                      AI Powered
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
                    <span className="text-xs text-slate-400">Sizes:</span>
                    <Badge variant="primary" size="sm">
                      Small Badge
                    </Badge>
                    <Badge variant="primary" size="md">
                      Medium Badge
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    import &#123; Badge &#125; from '@/components/ui/Badge'
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    leftIcon={
                      copiedSnippet === 'badge' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )
                    }
                    onClick={() =>
                      handleCopy(`<Badge variant="success" dot>System Online</Badge>`, 'badge')
                    }
                  >
                    {copiedSnippet === 'badge' ? 'Copied' : 'Copy JSX'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {/* INPUTS PANEL */}
          {activeTab === 'inputs' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 text-left relative z-20"
            >
              <Card className="bg-slate-950/85 backdrop-blur-xl border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle>Form Controls & Fields</CardTitle>
                  <CardDescription>
                    Tailwind-styled inputs with icons, validation error messages, and focus aura transitions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      placeholder="e.g. Jane Doe"
                      leftIcon={<User className="w-4 h-4" />}
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                    />

                    <Input
                      label="Email Address"
                      placeholder="name@company.com"
                      type="email"
                      leftIcon={<Mail className="w-4 h-4" />}
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      error={hasError ? 'Please provide a valid business email' : undefined}
                      helperText={!hasError ? 'We never share your email with third parties.' : undefined}
                    />

                    <Input
                      label="Search Index"
                      placeholder="Type keywords to filter..."
                      leftIcon={<Search className="w-4 h-4" />}
                    />

                    <Input
                      label="API Secret Key"
                      type="password"
                      placeholder="••••••••••••••••"
                      leftIcon={<Lock className="w-4 h-4" />}
                    />
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setHasError(!hasError)}
                    >
                      Toggle Validation Error State
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    import &#123; Input &#125; from '@/components/ui/Input'
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    leftIcon={
                      copiedSnippet === 'input' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )
                    }
                    onClick={() =>
                      handleCopy(
                        `<Input label="Email" placeholder="name@company.com" leftIcon={<Mail className="w-4 h-4" />} />`,
                        'input'
                      )
                    }
                  >
                    {copiedSnippet === 'input' ? 'Copied' : 'Copy JSX'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {/* CARDS & MODALS PANEL */}
          {activeTab === 'cards' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 text-left relative z-20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card glowEffect hoverEffect className="bg-slate-950/85 backdrop-blur-xl border-white/10 shadow-2xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="primary">Card Preset</Badge>
                      <Zap className="w-4 h-4 text-amber-400" />
                    </div>
                    <CardTitle className="mt-2">Glassmorphism Card</CardTitle>
                    <CardDescription>
                      Includes subtle backdrop blur, customizable gradient borders, and Framer Motion spring physics.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Easily customizable with Tailwind utility classes and nested Card subcomponents.
                    </p>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <span className="text-xs text-slate-400">Interactive Container</span>
                    <Button size="sm" variant="outline" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                      Details
                    </Button>
                  </CardFooter>
                </Card>

                <Card hoverEffect className="bg-slate-950/85 backdrop-blur-xl border-white/10 shadow-2xl">
                  <CardHeader>
                    <Badge variant="glowing" dot>
                      Dialog System
                    </Badge>
                    <CardTitle className="mt-2">Animated Modal Demo</CardTitle>
                    <CardDescription>
                      Experience smooth Framer Motion enter and exit animations with backdrop blur and Escape key handler.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="glow"
                      className="w-full"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Open Interactive Modal
                    </Button>
                  </CardContent>
                  <CardFooter>
                    <span className="text-xs text-slate-400 font-mono">
                      import &#123; Modal &#125; from '@/components/ui/Modal'
                    </span>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Live Modal Dialog */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Lumina UI Template Modal"
        description="Framer Motion AnimatePresence dialog with backdrop filter and keyboard navigation."
      >
        <div className="space-y-4 pt-2 text-left">
          <Input
            label="Project Name"
            defaultValue="My Next Big Project"
            leftIcon={<Sparkles className="w-4 h-4 text-indigo-400" />}
          />
          <Input
            label="Notification Recipient"
            defaultValue="developer@company.com"
            leftIcon={<Mail className="w-4 h-4 text-indigo-400" />}
          />
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="glow"
              onClick={() => setIsModalOpen(false)}
              rightIcon={<Send className="w-3.5 h-3.5" />}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  )
}
