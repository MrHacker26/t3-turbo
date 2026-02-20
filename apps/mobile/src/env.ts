import { z } from 'zod'

const envSchema = z.object({
  EXPO_PUBLIC_SERVER_URL: z.url().optional(),
  EXPO_PUBLIC_WEB_URL: z.url(),
})

export const env = envSchema.parse(process.env)
