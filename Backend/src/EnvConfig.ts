function requireEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const EnvConfig = {
  FrontendUrl: requireEnv("FRONTEND_URL"),
  Port: requireEnv("PORT"),
  LogsPath: requireEnv("LOGSPATH"),
  DatabaseUrl: requireEnv("DATABASE_URL"),
} as const;
