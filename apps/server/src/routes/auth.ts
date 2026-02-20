import { Hono } from 'hono'
import { z } from 'zod'

import { env } from '../env'
import { signAccessToken } from '../lib/jwt'

const authRouter = new Hono()

const exchangeTokenSchema = z.object({
  userId: z.string(),
  email: z.email(),
  name: z.string().optional(),
  image: z.string().optional(),
})

authRouter.post('/exchange', async (c) => {
  try {
    const internalSecret = c.req.header('x-internal-secret')
    if (!internalSecret || internalSecret !== env.INTERNAL_SECRET) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const body = await c.req.json()
    const parsed = exchangeTokenSchema.safeParse(body)

    if (!parsed.success) {
      return c.json(
        {
          error: 'Invalid request body',
          details: z.treeifyError(parsed.error),
        },
        400,
      )
    }

    const token = signAccessToken(parsed.data)

    return c.json({ token })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Token exchange error:', error)
    return c.json({ error: 'Token exchange failed' }, 500)
  }
})

export { authRouter }
