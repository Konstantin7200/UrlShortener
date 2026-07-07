import { NextFunction, Request, Response } from "express";
import { urlRepository } from "../repositories/urlRepository";

const getBaseUrl=async (req: Request, res: Response, next: NextFunction) => {
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
}
const getStatistics=(req: Request, res: Response) => {
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
}
const createUrl=(req: Request, res: Response) => {
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
}

export {getBaseUrl,getStatistics,createUrl}