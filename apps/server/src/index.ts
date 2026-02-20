/* eslint-disable no-console */
import { appRouter, createContext } from '@t3-turbo/trpc'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import { env } from './env'
import { authMiddleware } from './middleware/auth'

const app = new Hono()

app.use('*', logger())
app.use(
  '*',
  cors({
    origin: '*',
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization', 'x-trpc-source'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
)
app.use('*', authMiddleware)

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
  })
})

app.get('/', (c) => {
  return c.json({
    message: 'T3 Turbo Backend API',
    version: '1.0.0',
  })
})

app.all('/trpc/*', async (c) => {
  const response = await fetchRequestHandler({
    router: appRouter,
    req: c.req.raw,
    createContext: () => createContext(c),
    endpoint: '/trpc',
  })

  return response
})

app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404)
})

app.onError((err, c) => {
  console.error('Server error:', err)
  return c.json(
    {
      error:
        env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    },
    500,
  )
})

const port = env.PORT

console.log(`🚀 Server starting on port ${port}...`)

Bun.serve({
  fetch: app.fetch,
  port,
})
