import { useRouter, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

export default function AuthCallback() {
  const router = useRouter()
  const params = useLocalSearchParams()

  useEffect(() => {
    // Auth session is handled by WebBrowser automatically
    // This screen is just for visual feedback
    const timer = setTimeout(() => {
      router.replace('/')
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text style={styles.text}>Completing sign in...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
})
