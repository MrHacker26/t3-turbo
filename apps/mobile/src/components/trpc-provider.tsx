'use client'

import type { AppRouter } from '@t3-turbo/trpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCClient, httpLink, loggerLink } from '@trpc/client'
import Constants from 'expo-constants'
import { type ReactNode, useState } from 'react'
import SuperJSON from 'superjson'

import { trpc } from '@/trpc/client'
import { createQueryClient } from '@/trpc/query-client'

/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
export function getBaseUrl() {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   *
   * **NOTE**: This is only for development. In production, you'll want to set the
   * baseUrl to your production API URL.
   */
  const debuggerHost = Constants.expoConfig?.hostUri
  const localhost = debuggerHost?.split(':')[0]

  if (!localhost) {
    // Fallback for physical device - set your computer's IP here
    return 'http://192.168.1.1:3000'
  }
  return `http://${localhost}:3000`
}

let clientQueryClientSingleton: QueryClient
function getQueryClient() {
  // Mobile: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient())
}

export function TRPCProvider({ children }: { children: ReactNode }) {
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
          url: getBaseUrl() + '/api/trpc',
          headers() {
            const headers = new Headers()
            headers.set('x-trpc-source', 'expo-react')
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
