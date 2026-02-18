'use client'

import { trpc } from '@/trpc/client'

export default function Home() {
  const { data, isLoading } = trpc.example.getAll.useQuery()
  const { data: helloData } = trpc.example.hello.useQuery({ name: 'World' })

  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans">
      <main className="flex w-full max-w-3xl flex-col gap-8 bg-black px-16 py-32">
        <h1 className="tracking-tighttext-zinc-50 text-3xl font-semibold">
          tRPC + Next.js
        </h1>

        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-zinc-800 p-6">
            <h2 className="mb-2 text-xl font-medium text-zinc-50">
              Example Query
            </h2>
            {isLoading ? (
              <p className="text-zinc-600">Loading...</p>
            ) : (
              <div className="space-y-2">
                <p className="text-zinc-500">Message: {data?.message}</p>
                <p className="text-sm text-zinc-500">
                  Timestamp: {data?.timestamp?.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-zinc-800 p-6">
            <h2 className="mb-2 text-xl font-medium text-zinc-50">
              Hello Query
            </h2>
            <p className="text-zinc-500">{helloData?.greeting}</p>
          </div>
        </div>
      </main>
    </div>
  )
}
