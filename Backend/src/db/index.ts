import { loadEnvFile } from "node:process"
import {Pool} from "pg"

loadEnvFile(".env")
const pool = new Pool()

export default pool