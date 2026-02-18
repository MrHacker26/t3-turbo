# @t3-turbo/trpc

Shared tRPC API package for the T3 Turborepo.

## What's Inside

- tRPC router definitions
- Shared procedures and types
- Input validation schemas (Zod)

## Usage

This package is used by both the Next.js web app and Expo mobile app to ensure type-safe API communication.

```typescript
import { appRouter, type AppRouter } from '@t3-turbo/trpc'
```
