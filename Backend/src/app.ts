import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import { EnvConfig } from "./config";
import { globalErrorHandlingMiddleware } from "./middleware/errorHandlingMiddleware";
import { registerRoutes } from "./routes";

const app: Express = express();

const corsOptions: CorsOptions = {
  origin: [EnvConfig.FrontendUrl],
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));
app.use(express.json());
registerRoutes(app);
app.use(globalErrorHandlingMiddleware);

export default app;
