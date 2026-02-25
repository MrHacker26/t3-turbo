'use client'

import type { AppRouter } from '@t3-turbo/trpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCClient, httpLink, loggerLink } from '@trpc/client'
import { type ReactNode, useState } from 'react'
import { SuperJSON } from 'superjson'

import { useAuth } from './auth-provider'

import { env } from '@/env'
import { trpc } from '@/trpc/client'
import { createQueryClient } from '@/trpc/query-client'

export function getBaseUrl() {
  return env.EXPO_PUBLIC_SERVER_URL
}

let clientQueryClientSingleton: QueryClient
function getQueryClient() {
  // Mobile: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient())
}

export function TRPCProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth()
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        loggerLink({
          enabled: (op) =>
            __DEV__ || (op.direction === 'down' && op.result instanceof Error),
        }),
        httpLink({
          transformer: SuperJSON,
          url: getBaseUrl() + '/trpc',
          headers() {
            const headers = new Headers()
            headers.set('x-trpc-source', 'expo-react')

            // Send JWT token if available
            if (token) {
              headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
          },
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
