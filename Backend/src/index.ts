import "dotenv/config";
import app from "./app";
import "./routes/urlRoutes";
import { EnvConfig } from "./config";

app.listen(EnvConfig.Port);
