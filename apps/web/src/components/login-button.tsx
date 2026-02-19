'use client'

import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

export function LoginButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2">
        <p className="text-sm text-zinc-400">Loading...</p>
      </div>
    )
  }

  if (session) {
    return (
      <div className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-zinc-50">
            {session.user?.name}
          </p>
          <p className="text-xs text-zinc-400">{session.user?.email}</p>
        </div>
        <button
          onClick={() => signOut()}
          className="rounded bg-red-600 px-3 py-1.5 text-sm text-white transition hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
    >
      Sign in with Google
    </button>
  )
}
