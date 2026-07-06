import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './lib/auth'
import { StrategyApp } from './modules/strategy'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <StrategyApp />
    </AuthProvider>
  </StrictMode>,
)
