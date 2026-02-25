import { View, Text, Pressable } from 'react-native'

import { useTheme } from './theme-provider'

import { cn } from '@/lib/utils'
import { StyledMoonIcon, StyledSmartphoneIcon, StyledSunIcon } from './ui/icons'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { value: 'light' as const, label: 'Light', Icon: StyledSunIcon },
    { value: 'dark' as const, label: 'Dark', Icon: StyledMoonIcon },
    { value: 'system' as const, label: 'System', Icon: StyledSmartphoneIcon },
  ]

  return (
    <View className="border-border bg-card rounded-xl border p-4">
      <Text className="text-card-foreground mb-3 text-lg font-semibold">
        Theme
      </Text>
      <View className="flex-row gap-2">
        {themes.map((item) => {
          const isActive = theme === item.value
          const { Icon } = item

          return (
            <Pressable
              key={item.value}
              onPress={() => {
                setTheme(item.value)
              }}
              className={cn(
                'flex-1 flex-row items-center justify-center gap-2 rounded-lg p-3',
                isActive ? 'bg-primary' : 'bg-secondary',
              )}
            >
              <Icon
                size={18}
                className={
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                }
              />
              <Text
                className={cn(
                  'text-sm font-medium',
                  isActive
                    ? 'text-primary-foreground'
                    : 'text-secondary-foreground',
                )}
              >
                {item.label}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}
