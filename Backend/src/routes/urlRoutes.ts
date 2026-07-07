import app from "../app";
import { Request, Response } from "express";
import { checkUrl, createUrl, getBaseUrl, getStatistics } from "../controllers/urlController";
import { addVisitor } from "../controllers/visitorController";

app.get("/", (req: Request, res: Response) => {
    res.send("<h1>WOrking</h1>")
})

app.get("/api/url/short",getBaseUrl ,addVisitor)//getUrl

app.get("/api/url",checkUrl)

app.get("/api/url/statistics", getStatistics)//statistics

app.post("/api/url", createUrl)//createUrl
