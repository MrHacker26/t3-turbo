import type { AppRouter } from '@t3-turbo/trpc'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouter>()
