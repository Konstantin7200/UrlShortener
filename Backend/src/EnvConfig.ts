function requireEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const EnvConfig = {
  PgUser: requireEnv("PGUSER"),
  PgPassword: requireEnv("PGPASSWORD"),
  PgHost: requireEnv("PGHOST"),
  PgPort: requireEnv("PGPORT"),
  PgDatabase: requireEnv("PGDATABASE"),
  FrontendUrl: requireEnv("FRONTEND_URL"),
  Port: requireEnv("PORT"),
  LogsPath: requireEnv("LOGSPATH"),
  DatabaseUrl: requireEnv("DATABASE_URL"),
} as const;
