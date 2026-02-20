import { z } from 'zod'

import { publicProcedure, protectedProcedure, router } from '../trpc'

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
  getSecretMessage: protectedProcedure.query(({ ctx }) => {
    return {
      message: `Hello ${ctx.user.email}! This is a protected message.`,
      user: ctx.user,
    }
  }),
})

export const postRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany()
  }),
  create: protectedProcedure
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
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.delete({
        where: { id: input },
      })
    }),
})
