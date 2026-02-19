import { Link } from 'expo-router'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

export default function ProfilePage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>User Information</Text>
          <Text style={styles.cardText}>Name: John Doe</Text>
          <Text style={styles.cardText}>Email: john@example.com</Text>
        </View>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>← Back to Home</Text>
        </Link>
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
    marginBottom: 8,
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    fontSize: 16,
    color: '#3b82f6',
  },
})
