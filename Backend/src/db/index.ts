import { Pool } from "pg";
import { EnvConfig } from "../EnvConfig";

const pool = new Pool({
  user: EnvConfig.PgUser,
  password: EnvConfig.PgPassword,
  host: EnvConfig.PgHost,
  port: parseInt(EnvConfig.PgPort),
  database: EnvConfig.PgDatabase,
});

export default pool;
