import "dotenv/config";
import app from "./app";
import { EnvConfig } from "./EnvConfig";

app.listen(EnvConfig.Port);
