import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import { EnvConfig } from './config';
import { globalErrorHandlingMiddleware } from './middleware/errorHandlingMiddleware';

const app: Express = express();

const corsOptions:CorsOptions={
    origin:[EnvConfig.FrontendUrl],
    methods: ['GET', 'POST']
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(globalErrorHandlingMiddleware)
console.log("App started");
app.listen(3000)

export default app;