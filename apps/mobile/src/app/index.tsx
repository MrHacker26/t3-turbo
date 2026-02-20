import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native'

import { GoogleSignInButton } from '@/components/google-sign-in-button'
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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>T3 Turbo + Expo 🚀</Text>

        <GoogleSignInButton />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hello Query</Text>
          {helloLoading ? (
            <ActivityIndicator color="#a1a1aa" />
          ) : helloError ? (
            <View>
              <Text style={styles.errorText}>
                ❌ Error: {helloError.message}
              </Text>
              <Text style={styles.errorSubtext}>
                Make sure your Next.js server is running on port 3000
              </Text>
            </View>
          ) : (
            <Text style={styles.cardText}>{helloData?.greeting}</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Get All Query</Text>
          {allLoading ? (
            <ActivityIndicator color="#a1a1aa" />
          ) : allError ? (
            <View>
              <Text style={styles.errorText}>❌ Error: {allError.message}</Text>
              <Text style={styles.errorSubtext}>
                Make sure your Next.js server is running on port 3000
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.cardText}>Message: {allData?.message}</Text>
              <Text style={styles.cardSubtext}>
                Timestamp: {allData?.timestamp?.toLocaleString()}
              </Text>
            </>
          )}
        </View>

        <Link href="/profile" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Go to Profile →</Text>
          </Pressable>
        </Link>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#18181b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fafafa',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#a1a1aa',
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 14,
    color: '#71717a',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#a1a1aa',
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
