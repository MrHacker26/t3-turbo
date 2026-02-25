import { useState } from 'react'
import { Text, Pressable, ActivityIndicator } from 'react-native'

import { useAuth } from './auth-provider'

import { cn } from '@/lib/utils'
import { StyledLoginIcon, StyledLogoutIcon } from './ui/icons'

export function GoogleSignInButton() {
  const { signIn, signOut, token, isLoading } = useAuth()
  const [signing, setSigning] = useState(false)

  async function handlePress() {
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
      className={cn(
        'bg-primary my-4 flex-row items-center justify-center gap-2 rounded-lg p-4',
        signing && 'opacity-75',
      )}
      onPress={handlePress}
      disabled={signing}
    >
      {signing ? (
        <ActivityIndicator color="#fbfbfb" />
      ) : (
        <>
          {token ? (
            <StyledLogoutIcon size={18} className="text-primary-foreground" />
          ) : (
            <StyledLoginIcon size={18} className="text-primary-foreground" />
          )}
          <Text className="text-primary-foreground text-base font-semibold">
            {token ? 'Sign Out' : 'Sign in with Google'}
          </Text>
        </>
      )}
    </Pressable>
  )
}
