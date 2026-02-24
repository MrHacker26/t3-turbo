import { Link } from 'expo-router'
import { Text, View, ScrollView } from 'react-native'

export default function ProfilePage() {
  return (
    <ScrollView className="bg-background flex-1">
      <View className="flex-1 p-6">
        <Text className="text-foreground mb-6 text-3xl font-bold">Profile</Text>

        <View className="border-border bg-card mb-4 rounded-xl border p-5">
          <Text className="text-card-foreground mb-3 text-xl font-semibold">
            User Information
          </Text>
          <Text className="text-muted-foreground mb-2 text-base">
            Name: John Doe
          </Text>
          <Text className="text-muted-foreground mb-2 text-base">
            Email: john@example.com
          </Text>
        </View>

        <Link href="/" className="mt-5">
          <Text className="text-primary text-base">← Back to Home</Text>
        </Link>
      </View>
    </ScrollView>
  )
}
