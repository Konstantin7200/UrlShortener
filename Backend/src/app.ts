import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import { EnvConfig } from "./EnvConfig";
import { globalErrorHandlingMiddleware } from "./middleware/errorHandlingMiddleware";
import { registerRoutes } from "./routes";
import { pinoHttp } from "pino-http";
import { autoLoggingRulesFunction, logger } from "./PinoConfig";

const app: Express = express();
const httpLogger = pinoHttp({
  logger: logger,
  autoLogging: {
    ignore: autoLoggingRulesFunction,
  },
});

const corsOptions: CorsOptions = {
  origin: [EnvConfig.FrontendUrl],
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(httpLogger as unknown as express.RequestHandler);
registerRoutes(app);
app.use(globalErrorHandlingMiddleware);

export default app;
