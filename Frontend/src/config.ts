import { RequiredEnvVars } from "./envVars";

function requireEnv(name: string): string {
  const value = import.meta.env[name];
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const EnvConfig = Object.fromEntries(
  Object.entries(RequiredEnvVars).map(([key, value]) => [
    key,
    requireEnv(value),
  ]),
) as Record<keyof typeof RequiredEnvVars, string>;
