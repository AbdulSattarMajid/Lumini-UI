import React from 'react'
import { Terminal, Check, Copy } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { TokensCanvas } from '@/components/canvas/TokensCanvas'

export const DesignTokens: React.FC = () => {
  const [copied, setCopied] = React.useState<string | null>(null)

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const tokens = [
    { name: 'Primary Glow', class: 'bg-indigo-600', hex: '#4f46e5' },
    { name: 'Accent Purple', class: 'bg-purple-600', hex: '#9333ea' },
    { name: 'Surface Dark', class: 'bg-slate-900', hex: '#0f172a' },
    { name: 'Background Slate', class: 'bg-slate-950', hex: '#030712' },
    { name: 'Success Emerald', class: 'bg-emerald-500', hex: '#10b981' },
    { name: 'Border Slate', class: 'bg-slate-800', hex: '#1e293b' },
  ]

  const codeExample = `import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Sparkles } from 'lucide-react'

export function MyFeature() {
  return (
    <Card hoverEffect glowEffect>
      <CardHeader>
        <Badge variant="glowing" dot>Live Demo</Badge>
        <CardTitle>Next Generation UI</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="glow" rightIcon={<Sparkles className="w-4 h-4" />}>
          Get Started
        </Button>
      </CardContent>
    </Card>
  )
}`

  return (
    <section id="design-tokens" className="py-24 relative overflow-hidden section-theme-gradient">
      <TokensCanvas />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-3">
            Design Tokens & Usage
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Clean Palette & Effortless Integration
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Harmonious color scales, glassmorphism tokens, and clean developer ergonomics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch text-left relative z-20">
          {/* Palette Cards */}
          <Card className="bg-slate-950/85 backdrop-blur-xl border-white/10 shadow-2xl">
            <CardHeader>
              <CardTitle>Color Palette Tokens</CardTitle>
              <CardDescription>Tailored for high contrast dark-first user interfaces.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tokens.map((token) => (
                  <div
                    key={token.name}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-24"
                  >
                    <div className={`w-6 h-6 rounded-lg ${token.class} shadow-sm`} />
                    <div>
                      <div className="text-xs font-semibold text-white">{token.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{token.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Code Integration Preview */}
          <Card id="docs" className="bg-slate-950/85 backdrop-blur-xl border-white/10 shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Terminal className="w-4 h-4" />
                  <CardTitle className="text-base">Quickstart Snippet</CardTitle>
                </div>
                <button
                  onClick={() => copyCode(codeExample, 'quickstart')}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 border border-slate-700 transition-colors"
                >
                  {copied === 'quickstart' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <CardDescription>Drop any component into your React pages instantly.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl bg-slate-950/90 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
                <pre>
                  <code>{codeExample}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
