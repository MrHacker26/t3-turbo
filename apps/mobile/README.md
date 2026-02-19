# T3 Turbo - Expo Mobile App

This is the mobile application built with Expo and React Native, integrated with the T3 Turbo monorepo.

## Getting Started

### Prerequisites

- Node.js 18+ (or Bun)
- iOS Simulator (Mac only) or Android Emulator
- Expo Go app (for physical device testing)

### Installation

Dependencies are already installed at the monorepo level. If you need to install them again:

```bash
cd apps/mobile
bun install
```

### Development

**Start the Expo dev server:**

```bash
# From the root of the monorepo
bun dev

# Or from the mobile app directory
cd apps/mobile
bun dev
```

**Run on different platforms:**

```bash
# iOS (Mac only)
bun ios

# Android
bun android

# Web
bun web
```

## Testing

### Testing on Physical Device

1. Install the Expo Go app from the App Store (iOS) or Play Store (Android)
2. Run `bun dev` in the mobile directory
3. Scan the QR code with your camera (iOS) or the Expo Go app (Android)
4. Make sure your phone and computer are on the same network

### Testing on Simulator/Emulator

**iOS Simulator (Mac only):**

```bash
bun ios
```

**Android Emulator:**

```bash
bun android
```

### Metro bundler issues

```bash
# Clear cache and restart
bun dev --clear
```
