import express, { Express } from "express";
import { globalErrorHandlingMiddleware } from "./middleware/errorHandlingMiddleware";
import { registerRoutes } from "./routes";
import { httpLogger } from "./PinoConfig";
import { securityHeaders } from "./middleware/securityHeaders";

const app: Express = express();

app.use(securityHeaders);
app.use(express.json());
app.use(httpLogger);
registerRoutes(app);
app.use(globalErrorHandlingMiddleware);

export default app;
