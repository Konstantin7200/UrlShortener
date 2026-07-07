import { NextFunction, Request, Response } from "express";
import app from "../app";
import { urlRepository } from "../repositories/urlRepository";
import { locationAPI } from "../api/locationApi";
import { systemSettingsAPI } from "../api/systemSettingsApi";
import { visitorRepository } from "../repositories/visitorRepository";

app.get("/", (req: Request, res: Response) => {
    res.send("<h1>WOrking</h1>")
})

app.get("/api/url", async (req: Request, res: Response, next: NextFunction) => {
    const shortUrl = req.query.shortUrl;
    if (typeof shortUrl !== "string")
        res.status(400).json({
            status: 400,
            message: 'Bad request'
        });
    else {
        const { id, baseUrl } = await urlRepository.getBaseUrl(shortUrl);
        if (id != -1) {
            res.locals.urlId = id
            res.locals.baseUrl = baseUrl
            return next()
        }
        res.status(404)
    }
}, async (req: Request, res: Response, next: NextFunction) => {
    const location = await locationAPI.getLocation(req.ips[0])
    const { browser, os, version } = await systemSettingsAPI.getSystemSettings(req.headers["user-agent"])
    visitorRepository.addUser(res.locals.urlId, req.ips[0], browser, version, os, location)
    res.status(201).json({
        baseUrl: res.locals.baseUrl
    })
}
)//getUrl
app.get("/api/url/stats/", (req: Request, res: Response) => {
    const statsUrl = req.query.statsUrl;
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
        urlRepository.createUrls("", "", "");
        res.status(201).json({
            shortUrl: "",
            statisticsUrl: ""
        })
    }
})//createUrl
