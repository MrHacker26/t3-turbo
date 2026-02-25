import '@/global.css'

import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { AuthProvider } from '@/components/auth-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { TRPCProvider } from '@/components/trpc-provider'

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TRPCProvider>
          <Slot />
          <StatusBar />
        </TRPCProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
