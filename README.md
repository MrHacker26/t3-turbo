# T3 Turbo - Production-Ready Monorepo

Full-stack TypeScript monorepo with standalone Hono server, Next.js web app, Expo mobile app, and shared tRPC API.


## Stack

- **Server**: Hono (standalone, port 4000)
- **Web**: Next.js 15 + App Router + NextAuth
- **Mobile**: Expo (React Native)
- **API**: tRPC (shared across web & mobile)
- **Database**: Prisma + MongoDB
- **Auth**: JWT tokens via NextAuth (Google OAuth)
- **Monorepo**: TurboRepo + Bun

## Architecture Highlights

✅ **Standalone Server** - Hono server completely independent from Next.js  
✅ **JWT Authentication** - Secure token-based auth for API access  
✅ **OAuth with Google** - NextAuth handles social login  
✅ **Type-Safe API** - Full TypeScript type safety with tRPC  
✅ **Shared Code** - Same tRPC router for web and mobile  
✅ **Production Ready** - Docker, environment validation, CORS, error handling

## Project Structure

```
.
├── apps/
│   ├── server/        # Hono server (port 4000)
│   ├── web/           # Next.js web app (port 3000)
│   └── mobile/        # Expo mobile app
└── packages/
    ├── db/            # Prisma + MongoDB
    ├── trpc/          # Shared tRPC router
    └── config/        # Shared ESLint/Prettier configs
```

## Getting Started

### Prerequisites

- Node.js 18+
- Bun package manager
- MongoDB (local or Atlas)
- Google OAuth credentials

### Quick Start

```bash
# 1. Install dependencies
bun install

# 2. Setup environment variables (see QUICKSTART.md)
cp .env.example .env
# Edit .env with your values

# 3. Initialize database
bun db:generate
bun db:push

# 4. Start all services
bun dev
```

## Development

```bash
# Start all apps (server, web, mobile)
bun dev

# Build all packages
bun build

# Type checking
bun typecheck

# Linting
bun lint

# Format code
bun format

# Database commands
bun db:generate    # Generate Prisma client
bun db:push        # Push schema changes
bun db:studio      # Open Prisma Studio
```

## Packages

- `@t3-turbo/db` - Prisma database client with MongoDB
- `@t3-turbo/trpc` - Shared tRPC API routers (public & protected procedures)
- `@t3-turbo/config` - Shared ESLint and Prettier configs

## Deployment

### Server

Deploy Hono server to Railway, Render, or any Node.js host:

```bash
cd apps/server
bun build
bun start
```

Or use Docker:

```bash
docker-compose up -d server
```

### Web App

Deploy to Vercel (recommended):

```bash
cd apps/web
vercel
```

### Mobile App

Build with EAS:

```bash
cd apps/mobile
eas build --platform ios
eas build --platform android
```