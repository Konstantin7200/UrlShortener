import { Request, Response } from "express";
import app from "../app";
import { urlRepository } from "../repositories/urlRepository";

app.get("/", (req: Request, res: Response) => {
    res.send("<h1>WOrking</h1>")
})

app.get("/api/url", (req: Request, res: Response) => {
    const shortUrl = req.query.shortUrl;
    if (typeof shortUrl !== "string")
        res.status(400).json({
            status: 400,
            message: 'Bad request'
        });
    else {
        urlRepository.getLongUrl(shortUrl);
        res.status(201).json({
            longUrl:""
        })
    }
})//getUrl
app.get("/api/url/stats/", (req: Request, res: Response) => {
    const statsUrl=req.query.statsUrl;
    if (typeof statsUrl !== "string")
        res.status(400).json({
            status: 400,
            message: 'Bad request'
        });
    else {
        urlRepository.getStats(statsUrl);
        res.status(201).json([])
    }
})//statistics

app.post("/api/url", (req: Request, res: Response) => {
    const baseUrl = req.query.baseUrl;
    if (typeof baseUrl !== "string")
        res.status(400).json({
            status: 400,
            message: 'Bad request'
        });
    else {
        urlRepository.createUrls("","","");
        res.status(201).json({
            shortUrl: "",
            statisticsUrl: ""
        })
    }
})//createUrl
