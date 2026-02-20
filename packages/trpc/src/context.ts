import { db, type User } from '@t3-turbo/db'
import type { Context as HonoContext } from 'hono'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/v11/context
 */
export const createContext = async (honoContext: HonoContext) => {
  // Extract user from Hono context (set by auth middleware)
  const user = honoContext.get('user') as User | undefined

  return {
    db,
    user: user ?? null,
    headers: honoContext.req.raw.headers,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
