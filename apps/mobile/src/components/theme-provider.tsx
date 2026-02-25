import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useContext, useState, useEffect } from 'react'
import { useColorScheme, View } from 'react-native'

const THEME_STORAGE_KEY = '@theme_preference'

type Theme = 'light' | 'dark' | 'system'

type ThemeContextType = {
  theme: Theme
  colorScheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme() ?? 'light'
  const [theme, setThemeState] = useState<Theme>('system')

  useEffect(() => {
    loadTheme()
  }, [])

  async function loadTheme() {
    try {
      const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY)
      if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
        setThemeState(storedTheme as Theme)
      }
    } catch (error) {
      console.error('Failed to load theme:', error)
    }
  }

  async function setTheme(newTheme: Theme) {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme)
      setThemeState(newTheme)
    } catch (error) {
      console.error('Failed to save theme:', error)
    }
  }

  const colorScheme = theme === 'system' ? systemColorScheme : theme

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, setTheme }}>
      <View
        className={colorScheme === 'dark' ? 'dark' : ''}
        style={{ flex: 1 }}
      >
        {children}
      </View>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
