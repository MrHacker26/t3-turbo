import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    // Auth session is handled by WebBrowser automatically
    // This screen is just for visual feedback
    const timer = setTimeout(() => {
      router.replace('/')
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <View className="bg-background flex-1 items-center justify-center gap-4">
      <ActivityIndicator size="large" color="#136e6b" />
      <Text className="text-foreground text-base">Completing sign in...</Text>
    </View>
  )
}
