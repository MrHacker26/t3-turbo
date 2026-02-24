import { View, Text } from 'react-native'

export function LoadingSpinner() {
  return (
    <View className="bg-background flex-1 items-center justify-center">
      <Text className="text-muted-foreground text-base">Loading...</Text>
    </View>
  )
}
