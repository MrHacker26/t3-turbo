import type { Context as HonoContext } from 'hono'

import { extractTokenFromHeader, verifyToken, type AuthUser } from '../lib/jwt'

/**
 * Middleware to extract and verify JWT token from request headers
 * Attaches the user to the Hono context if token is valid
 */
export async function authMiddleware(
  c: HonoContext,
  next: () => Promise<void>,
) {
  const authHeader = c.req.header('Authorization')
  const token = extractTokenFromHeader(authHeader ?? null)

  if (token) {
    const user = verifyToken(token)
    if (user) {
      c.set('user', user)
    }
  }

  await next()
}

/**
 * Get authenticated user from Hono context
 * Returns null if no valid token was provided
 */
export function getAuthUser(c: HonoContext): AuthUser | null {
  return c.get('user') ?? null
}

/**
 * Require authentication - throws if user is not authenticated
 */
export function requireAuth(c: HonoContext): AuthUser {
  const user = getAuthUser(c)

  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}
