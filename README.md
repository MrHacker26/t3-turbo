# T3 Turborepo

Full-stack TypeScript monorepo with shared tRPC API for Next.js web app and Expo mobile app.

## Stack

- **Web**: Next.js + tRPC + shadcn/ui
- **Mobile**: Expo + tRPC
- **tRPC**: Shared tRPC procedures
- **Database**: Prisma + MongoDB
- **Monorepo**: Turborepo

## Packages

- `@t3-turbo/db` - Prisma database client with MongoDB
- `@t3-turbo/trpc` - Shared tRPC API routers
- `@t3-turbo/config` - Shared ESLint and Prettier configs

## Environment Variables

Each app manages its own environment variables:
- **db package**: Validates `DATABASE_URL`
- **web app**: Uses `@t3-oss/env-nextjs` for Next.js-specific vars