import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { env } from '../env'

export const jwtPayloadSchema = z.object({
  userId: z.string(),
  email: z.email(),
  name: z.string().optional(),
  image: z.string().optional(),
})

export type JWTPayload = z.infer<typeof jwtPayloadSchema>

export type AuthUser = JWTPayload

/**
 * Generate a JWT token for a user
 */
export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as jwt.SignOptions)
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET as string)
    const parsed = jwtPayloadSchema.safeParse(decoded)

    if (!parsed.success) {
      return null
    }

    return parsed.data as AuthUser
  } catch {
    return null
  }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(
  authHeader: string | null,
): string | null {
  if (!authHeader) {
    return null
  }

  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null
  }

  return parts[1] ?? null
}
