import express, { Express } from 'express';
const cors=require('cors')

const app: Express = express();

const corsOptions={
    origin:[process.env.FRONTEND_URL],
    methods: ['GET', 'POST']
}

app.use(cors(corsOptions))
app.use(express.json())
console.log("App started");

export default app;