import { db } from '@t3-turbo/db'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/v11/context
 */
export const createContext = async (opts?: FetchCreateContextFnOptions) => {
  return {
    db,
    headers: opts?.req.headers,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
