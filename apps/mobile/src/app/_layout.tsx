import '@/global.css'

import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { AuthProvider } from '@/components/auth-provider'
import { TRPCProvider } from '@/components/trpc-provider'

export default function RootLayout() {
  return (
    <AuthProvider>
      <TRPCProvider>
        <Slot />
        <StatusBar />
      </TRPCProvider>
    </AuthProvider>
  )
}
