import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'



const requiredEnvVars = ['VITE_API_URL']
const env=loadEnv("",process.cwd(),"")
const missingVars = requiredEnvVars.filter(key => !env[key])

if (missingVars.length > 0) {
    throw new Error(
        `Missing environment variables:\n${missingVars.map(v => `  - ${v}`).join('\n')}`
    )
}

export default defineConfig({
  plugins: [tailwindcss(), react()],
})
