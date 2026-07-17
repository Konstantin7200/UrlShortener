import app from "../app";
import { Request, Response } from "express";
import {  resolveUrl, resolveUrlCreation } from "../controllers/urlController";

app.get("/", (req: Request, res: Response) => {
    res.send("<h1>WOrking</h1>")
})

app.get("/api/url",resolveUrl)

app.post("/api/url", resolveUrlCreation)//createUrl
