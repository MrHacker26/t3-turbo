import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native'

import { GoogleSignInButton } from '@/components/google-sign-in-button'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { trpc } from '@/trpc/client'

export default function Index() {
  const {
    data: helloData,
    isLoading: helloLoading,
    error: helloError,
  } = trpc.example.hello.useQuery({ name: 'Mobile' })

  const {
    data: allData,
    isLoading: allLoading,
    error: allError,
  } = trpc.example.getAll.useQuery()

  return (
    <ScrollView className="bg-background flex-1">
      <View className="flex-1 gap-y-4 p-6 pt-6">
        <Text className="text-foreground mb-6 text-3xl font-bold">
          T3 Turbo + Expo 🚀
        </Text>

        <ThemeSwitcher />
        <GoogleSignInButton />

        <View className="border-border bg-card rounded-xl border p-5">
          <Text className="text-card-foreground mb-3 text-xl font-semibold">
            Hello Query
          </Text>
          {helloLoading ? (
            <ActivityIndicator color="#8b8b92" />
          ) : helloError ? (
            <View>
              <Text className="text-destructive mb-2 text-base">
                ❌ Error: {helloError.message}
              </Text>
              <Text className="text-muted-foreground text-sm">
                Make sure your server is running on port 3000
              </Text>
            </View>
          ) : (
            <Text className="text-muted-foreground text-base">
              {helloData?.greeting}
            </Text>
          )}
        </View>

        <View className="border-border bg-card rounded-xl border p-5">
          <Text className="text-card-foreground mb-3 text-xl font-semibold">
            Get All Query
          </Text>
          {allLoading ? (
            <ActivityIndicator color="#8b8b92" />
          ) : allError ? (
            <View>
              <Text className="text-destructive mb-2 text-base">
                ❌ Error: {allError.message}
              </Text>
              <Text className="text-muted-foreground text-sm">
                Make sure your server is running.
              </Text>
            </View>
          ) : (
            <>
              <Text className="text-muted-foreground mb-1 text-base">
                Message: {allData?.message}
              </Text>
              <Text className="text-muted-foreground/80 text-sm">
                Timestamp: {allData?.timestamp?.toLocaleString()}
              </Text>
            </>
          )}
        </View>

        <Link href="/profile" asChild>
          <Pressable className="bg-primary mt-5 items-center rounded-lg p-4">
            <Text className="text-primary-foreground text-base font-semibold">
              Go to Profile →
            </Text>
          </Pressable>
        </Link>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  )
}
