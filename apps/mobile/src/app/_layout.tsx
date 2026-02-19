import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { TRPCProvider } from '@/components/trpc-provider'

export default function RootLayout() {
  return (
    <TRPCProvider>
      <Slot />
      <StatusBar />
    </TRPCProvider>
  )
}
