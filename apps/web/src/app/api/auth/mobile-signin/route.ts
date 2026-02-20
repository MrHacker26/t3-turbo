import { signIn } from '@/auth'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mobileScheme = searchParams.get('scheme') ?? 'exp'
  const mobileHost = searchParams.get('host') ?? 'localhost:8081'

  if (!mobileScheme || !mobileHost) {
    return Response.json(
      { error: 'Missing scheme or host parameter' },
      { status: 400 },
    )
  }

  const callbackUrl = `/api/auth/mobile-callback?scheme=${mobileScheme}&host=${encodeURIComponent(mobileHost)}`

  await signIn('google', { redirectTo: callbackUrl })
}
