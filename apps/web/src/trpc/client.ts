import type { AppRouter } from '@t3-turbo/trpc'
import { createTRPCReact, type CreateTRPCReact } from '@trpc/react-query'

export const trpc: CreateTRPCReact<AppRouter, unknown> =
  createTRPCReact<AppRouter>()
