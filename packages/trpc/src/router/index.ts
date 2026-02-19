import { router } from '../trpc'

import { exampleRouter, postRouter } from './example'

export const appRouter = router({
  example: exampleRouter,
  post: postRouter,
})

export type AppRouter = typeof appRouter
