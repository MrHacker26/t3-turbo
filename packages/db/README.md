# @t3-turbo/db

Shared Prisma database client for the T3 Turborepo.

## What's Inside

- Prisma Client configuration
- Database schema definitions
- Singleton pattern for DB connection
- Environment variable validation (DATABASE_URL)

## Usage

```typescript
import { db } from '@t3-turbo/db';

const posts = await db.post.findMany();
```

## Environment Variables

This package validates:
- `DATABASE_URL` - MongoDB connection string (required)
- `NODE_ENV` - Environment mode (development/production/test)

## Commands

- `bun db:generate` - Generate Prisma Client
- `bun db:push` - Push schema to database
- `bun db:studio` - Open Prisma Studio
