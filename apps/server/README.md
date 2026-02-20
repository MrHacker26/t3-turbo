# Hono Server

This is the standalone server built with Hono that serves the tRPC API for both web and mobile apps.

## Development

```bash
# Install dependencies (run from root)
bun install

# Start development server
bun dev

# Build for production
bun build

# Start production server
bun start
```

## Auth Flow (Google OAuth -> JWT)

- Web (Next.js) signs in with Google only.
- After OAuth, the web app issues a JWT.
- Web and mobile send that JWT in the `Authorization` header for all API calls.
- Server verifies JWT, attaches user to context, and `protectedProcedure` enforces auth.

## Authentication

The server uses JWT tokens for authentication. Tokens should be included in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Tokens are issued by the Next.js web app after successful OAuth login via NextAuth.
