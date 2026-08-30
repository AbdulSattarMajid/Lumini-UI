import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from '@/LandingPage'
import { AuthPage } from '@/AuthPage'
import { SignupPage } from '@/SignupPage'
import { Dashboard } from '@/Dashboard'
import { Overview } from '@/pages/dashboard/Overview'
import { Models } from '@/pages/dashboard/Models'
import { Datasets } from '@/pages/dashboard/Datasets'
import { Analytics } from '@/pages/dashboard/Analytics'
import { Settings } from '@/pages/dashboard/Settings'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ThemeProvider } from '@/lib/ThemeContext'

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <CustomCursor />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="models" element={<Models />} />
            <Route path="datasets" element={<Datasets />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
