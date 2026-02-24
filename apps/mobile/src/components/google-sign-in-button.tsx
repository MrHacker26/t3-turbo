import { useState } from 'react'
import { Text, Pressable, ActivityIndicator } from 'react-native'

import { useAuth } from './auth-provider'

export function GoogleSignInButton() {
  const { signIn, signOut, token, isLoading } = useAuth()
  const [signing, setSigning] = useState(false)

  const handlePress = async () => {
    if (token) {
      await signOut()
    } else {
      setSigning(true)
      await signIn()
      setSigning(false)
    }
  }

  if (isLoading) {
    return (
      <Pressable
        className="bg-primary my-4 items-center rounded-lg p-4"
        disabled
      >
        <ActivityIndicator color="#fbfbfb" />
      </Pressable>
    )
  }

  return (
    <Pressable
      className="bg-primary my-4 items-center rounded-lg p-4"
      onPress={handlePress}
      disabled={signing}
    >
      {signing ? (
        <ActivityIndicator color="#fbfbfb" />
      ) : (
        <Text className="text-primary-foreground text-base font-semibold">
          {token ? '🔓 Sign Out' : '🔐 Sign in with Google'}
        </Text>
      )}
    </Pressable>
  )
}
