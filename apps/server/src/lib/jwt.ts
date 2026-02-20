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

export function signAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: env.JWT_EXPIRES_IN,
  })
}

export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET, {
      algorithms: ['HS256'],
    })

    const parsed = jwtPayloadSchema.safeParse(decoded)
    if (!parsed.success) {
      return null
    }

    return parsed.data
  } catch {
    return null
  }
}

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
