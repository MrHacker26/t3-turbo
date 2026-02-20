import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { type DefaultSession } from 'next-auth'
import Google from 'next-auth/providers/google'
import { db } from '@t3-turbo/db'
import { env } from './env'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      accessToken?: string
    } & DefaultSession['user']
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      try {
        const response = await fetch(
          `${env.NEXT_PUBLIC_SERVER_URL}/auth/exchange`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-internal-secret': env.INTERNAL_SECRET,
            },
            body: JSON.stringify({
              userId: user.id,
              email: user.email,
              name: user.name ?? undefined,
              image: user.image ?? undefined,
            }),
          },
        )

        if (response.ok) {
          const { token } = (await response.json()) as { token: string }
          return {
            ...session,
            user: {
              ...session.user,
              id: user.id,
              accessToken: token,
            },
          }
        }
      } catch (error) {
        console.error('Token exchange failed in session callback:', error)
      }

      // Fallback without token if exchange fails
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      }
    },
  },
})
