/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import { createContext, useContext, useState, useEffect } from 'react'

import { env } from '@/env'

WebBrowser.maybeCompleteAuthSession()

const TOKEN_STORAGE_KEY = '@auth_token'

type AuthContextType = {
  token: string | null
  isLoading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)
const webAppUrl = env.EXPO_PUBLIC_WEB_URL

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load token from storage on mount
    loadToken()
  }, [])

  async function loadToken() {
    try {
      const storedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY)
      if (storedToken) {
        setToken(storedToken)
      }
    } catch (error) {
      console.error('Failed to load token:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function signIn() {
    try {
      // Get mobile app scheme and host for deep linking
      const redirectUrl = Linking.createURL('/auth/callback')
      const url = new URL(redirectUrl)
      const scheme = url.protocol.replace(':', '')
      const host = url.host

      // Use mobile-signin endpoint which handles CSRF token and form submission
      const authUrl = `${webAppUrl}/api/auth/mobile-signin?scheme=${scheme}&host=${encodeURIComponent(host)}`

      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl)

      if (result.type === 'success') {
        // Parse the URL to extract JWT token
        const returnUrl = new URL(result.url)
        const jwtToken = returnUrl.searchParams.get('token')
        const error = returnUrl.searchParams.get('error')

        if (error) {
          console.error('Authentication error:', error)
          return
        }

        if (jwtToken) {
          await AsyncStorage.setItem(TOKEN_STORAGE_KEY, jwtToken)
          setToken(jwtToken)
        }
      }
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem(TOKEN_STORAGE_KEY)
      setToken(null)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ token, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
