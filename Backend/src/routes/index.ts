import { Application, Request, Response } from "express";
import urlRoutes from "./urlRoutes"

export const registerRoutes = (app: Application) => {
    app.use("/api/url", urlRoutes)

    app.get("/", (req: Request, res: Response) => res.send('OK'))
}





