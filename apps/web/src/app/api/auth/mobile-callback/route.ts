import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const searchParams = request.nextUrl.searchParams
    const mobileScheme = searchParams.get('scheme') ?? 'exp'
    const mobileHost = searchParams.get('host') ?? 'localhost:8081'

    if (!session?.user) {
      // Redirect back to mobile app with error
      const errorUrl = `${mobileScheme}://${mobileHost}/--/auth/callback?error=no_session`
      return NextResponse.redirect(errorUrl)
    }

    const token = session.user.accessToken

    if (!token) {
      // Token exchange failed in session callback
      const errorUrl = `${mobileScheme}://${mobileHost}/--/auth/callback?error=token_exchange_failed`
      return NextResponse.redirect(errorUrl)
    }

    const callbackUrl = `${mobileScheme}://${mobileHost}/--/auth/callback?token=${token}`

    return NextResponse.redirect(callbackUrl)
  } catch (error) {
    console.error('Mobile callback error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    )
  }
}
