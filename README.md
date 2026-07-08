# URL Shortener

A full-stack URL shortener with visitor analytics. Built with React 19, Express 5, PostgreSQL, and TypeScript.

## Tech Stack

**Frontend** — React 19, TypeScript, Vite, Tailwind CSS v4, Redux Toolkit, React Router v8  
**Backend** — Node.js (21.7+), Express 5, TypeScript, PostgreSQL, ts-node  
**Database** — PostgreSQL with `Urls` and `Visitors` tables

## Project Structure

```
├── Backend/
│   └── src/
│       ├── api/          # External API calls (IP geolocation, UA parsing)
│       ├── controllers/  # Request handlers
│       ├── db/           # Database pool and schema
│       ├── repositories/ # Database access layer
│       └── routes/       # Express route definitions
├── Frontend/
│   └── src/
│       ├── pages/        # Page components
│       ├── store/        # Redux store and slices
│       ├── endpoints.ts  # API client
│       └── types.ts      # Shared type definitions
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 21.7+
- PostgreSQL

### 1. Database

Create a PostgreSQL database and run the schema:

```sh
psql -U postgres -d urldb -f Backend/src/db/schema.sql
```

### 2. Backend

```sh
cd Backend
npm install
npm run dev
```

The server starts on `http://localhost:3000`.

### 3. Frontend

```sh
cd Frontend
npm install
npm run dev
```

The dev server starts on `http://localhost:5173`.

### Environment

Both `.env` files are pre-configured for local development:

**Backend/.env**
```
PGUSER=yourUser
PGPASSWORD=yourPassword
PGHOST=localhost
PGPORT=5432
PGDATABASE=urldb
FRONTEND_URL=http://localhost:5173
```

**Frontend/.env**
```
VITE_API_URL=http://localhost:3000
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/url?url={code}` | Check if a code is a short URL or stats URL (redirects accordingly) |
| GET | `/api/url/short?shortUrl={code}` | Resolve a short URL to its original URL and log a visitor |
| GET | `/api/url/statistics?statisticsUrl={code}` | Get visitor statistics for a stats URL |
| POST | `/api/url?baseUrl={url}` | Create a new shortened URL |
| GET | `/` | Health check |

## Features

- Short URL generation using SHA-256 hashing + Base62 encoding
- Visitor tracking (IP, browser, OS, location via ip-api.com)
- Per-link statistics dashboard
- Collision-resistant URL encoding
