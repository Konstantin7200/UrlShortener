

function requireEnv(name: string): string {
    const value = import.meta.env[name]
    if (value === undefined) {
        throw new Error(`Missing environment variable: ${name}`)
    }
    return value
}

export const EnvConfig = {
    ApiUrl: requireEnv('VITE_API_URL'),
} as const
