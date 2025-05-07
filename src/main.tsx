import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import App from './app/App.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '@/ui/organisms/ErrorFallback'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
       <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
       </ErrorBoundary>
  </StrictMode>,
)
