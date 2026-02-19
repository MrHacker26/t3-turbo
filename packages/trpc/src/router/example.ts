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

export const postRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany()
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: input,
      })
    }),
})
