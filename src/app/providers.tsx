import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { ReactNode } from 'react'
import { queryClient } from '../shared/api/queryClient'
import './sideEffects/catApiInterceptors'

type ProvidersProps = { children: ReactNode }

export const Providers = ({ children }: ProvidersProps) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
