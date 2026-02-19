import { View, Text, StyleSheet } from 'react-native'

export function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#a1a1aa',
    fontSize: 16,
  },
})
