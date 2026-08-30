import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { StatsBanner } from '@/components/sections/StatsBanner'
import { Features } from '@/components/sections/Features'
import { ComponentPlayground } from '@/components/sections/ComponentPlayground'
import { DesignTokens } from '@/components/sections/DesignTokens'
import { Testimonials } from '@/components/sections/Testimonials'
import { Pricing } from '@/components/sections/Pricing'
import { FAQ } from '@/components/sections/FAQ'
import { InteractiveCanvas } from '@/components/InteractiveCanvas'

export function LandingPage() {
  return (
    <div
      className="relative min-h-screen text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden transition-colors duration-700"
      style={{ backgroundColor: 'var(--theme-bg)' }}
    >
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative flex-grow">
        {/* Hero Section Container with 3D Canvas in background */}
        <div className="relative overflow-hidden">
          {/* 3D Interactive Particle Field behind Hero (pointer-events-none so inputs & buttons work flawlessly) */}
          <InteractiveCanvas className="z-0 opacity-75" />

          {/* Hero Section Content positioned above canvas */}
          <div className="relative z-10">
            <Hero />
          </div>
        </div>

        {/* Subsequent Sections */}
        <StatsBanner />
        <Testimonials />
        <ComponentPlayground />
        <Features />
        <Pricing />
        <DesignTokens />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default LandingPage
