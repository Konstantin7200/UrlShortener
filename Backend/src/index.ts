import "dotenv/config";
import app from "./app";
import { EnvConfig } from "./config";

app.listen(EnvConfig.Port);
