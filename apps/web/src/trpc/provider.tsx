'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCClient, httpLink, loggerLink } from '@trpc/client'
import { type ReactNode, useState } from 'react'
import { useSession } from 'next-auth/react'
import SuperJSON from 'superjson'
import { createQueryClient } from './query-client'
import type { AppRouter } from '@t3-turbo/trpc'
import { trpc } from './client'

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SERVER_URL
}

let clientQueryClientSingleton: QueryClient
function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return createQueryClient()
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient())
}

export function TRPCProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        httpLink({
          transformer: SuperJSON,
          url: getBaseUrl() + '/trpc',
          headers() {
            const headers = new Headers()
            headers.set('x-trpc-source', 'nextjs-react')

            if (session?.user.accessToken) {
              headers.set('Authorization', `Bearer ${session.user.accessToken}`)
            }

            return headers
          },
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </trpc.Provider>
    </QueryClientProvider>
  )
}
