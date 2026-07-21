# URL Shortener

A full-stack URL shortener with visitor analytics. Built with React 19, Express 5, PostgreSQL (via Prisma), and TypeScript.

## Tech Stack

**Frontend** — React 19, TypeScript, Vite, Tailwind CSS v4, Redux Toolkit, React Router v8  
**Backend** — Node.js (21.7+), Express 5, TypeScript, Prisma ORM, PostgreSQL  
**Database** — PostgreSQL with `Urls` and `Visitors` tables

## Project Structure

```
├── Backend/
│   ├── prisma/                # Prisma schema and migrations
│   ├── src/
│   │   ├── api/               # External API calls (IP geolocation, UA parsing)
│   │   ├── controllers/       # Request handlers
│   │   ├── db/                # Prisma client and SQL schema
│   │   ├── middleware/        # Error handling middleware
│   │   ├── repositories/      # Database access layer (Prisma queries)
│   │   ├── routes/            # Express route definitions
│   │   ├── services/          # Business logic layer
│   │   ├── utils/             # URL encoding, validation helpers
│   │   ├── EnvConfig.ts       # Environment variable validation
│   │   ├── PinoConfig.ts      # Logging configuration
│   │   ├── app.ts             # Express app setup
│   │   └── index.ts           # Server entry point
│   ├── openapi.yaml           # API specification
│   └── package.json
├── Frontend/
│   └── src/
│       ├── pages/             # Page components (Home, Stats, Redirect)
│       ├── store/             # Redux store and slices
│       ├── config.ts          # Frontend env config
│       ├── endpoints.ts       # API client
│       ├── envVars.ts         # Required env var definitions
│       └── types.ts           # Shared type definitions
├── .nvmrc
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js v24.14.1 (see `.nvmrc`)
- PostgreSQL

### 1. Database

Create a PostgreSQL database:

```sh
psql -U postgres -d urldb -f Backend/src/db/schema.sql
```

Or use Prisma migrations:

```sh
cd Backend
npx prisma migrate dev
```

### 2. Backend

```sh
cd Backend
npm install
npx prisma generate
npm run dev
```

The server starts on the port specified in the `PORT` env variable (default `3000`).

### 3. Frontend

```sh
cd Frontend
npm install
npm run dev
```

The dev server starts on `http://localhost:5173`.

### Environment

**Backend/.env**
```
PGUSER=yourUser
PGPASSWORD=yourPassword
PGHOST=localhost
PGPORT=5432
PGDATABASE=urldb
FRONTEND_URL=http://localhost:5173
PORT=3000
LOGSPATH=app.log
DATABASE_URL=postgresql://yourUser:yourPassword@localhost:5432/urldb
```

**Frontend/.env** (see `.env.example`)
```
VITE_API_URL=http://localhost:3000
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/url?url={code}` | Resolve a code: returns `{ baseUrl }` for short URLs or visitor stats array for statistics URLs |
| POST | `/api/url` | Create a shortened URL — body: `{ "baseUrl": "..." }` → returns `{ shortUrl, statisticsUrl }` |
| GET | `/` | Health check — returns `OK` |

## OpenAPI Spec

An OpenAPI 3.1 specification is available at `Backend/openapi.yaml`.

## Features

- Short URL generation using SHA-256 hashing + Base62 encoding
- Visitor tracking (IP, browser, OS, location via ip-api.com)
- Per-link statistics dashboard with table view
- Collision-resistant URL encoding (up to 1000 retries)
- Pino structured logging to file and stdout
- Input validation (protocol, slashes, domain dot check)
- Prisma ORM with PostgreSQL for type-safe database access
