import { useState } from 'react'
import { Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native'

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
      <Pressable style={styles.button} disabled>
        <ActivityIndicator color="#fff" />
      </Pressable>
    )
  }

  return (
    <Pressable style={styles.button} onPress={handlePress} disabled={signing}>
      {signing ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>
          {token ? '🔓 Sign Out' : '🔐 Sign in with Google'}
        </Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4285F4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
