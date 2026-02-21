'use client'

import { trpc } from '@/trpc/client'
import { LoginButton } from '@/components/login-button'

export default function Home() {
  const { data, isLoading } = trpc.example.getAll.useQuery()
  const { data: helloData } = trpc.example.hello.useQuery({ name: 'World' })

  return (
    <div className="bg-background flex min-h-screen items-center justify-center font-sans">
      <main className="flex w-full max-w-3xl flex-col gap-8 px-16 py-32">
        <div className="flex items-center justify-between">
          <h1 className="text-foreground text-3xl font-semibold tracking-tight">
            tRPC + Next.js
          </h1>
          <LoginButton />
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-lg border p-6">
            <h2 className="text-foreground mb-2 text-xl font-medium">
              Example Query
            </h2>
            {isLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : (
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Message: {data?.message}
                </p>
                <p className="text-muted-foreground text-sm">
                  Timestamp: {data?.timestamp?.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="text-foreground mb-2 text-xl font-medium">
              Hello Query
            </h2>
            <p className="text-muted-foreground">{helloData?.greeting}</p>
          </div>
        </div>
      </main>
    </div>
  )
}
