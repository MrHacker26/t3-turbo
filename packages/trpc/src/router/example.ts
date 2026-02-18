import { z } from 'zod'

import { publicProcedure, router } from '../trpc'

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name}!`,
      }
    }),
  getAll: publicProcedure.query(() => {
    return {
      message: 'tRPC is working!',
      timestamp: new Date(),
    }
  }),
})
