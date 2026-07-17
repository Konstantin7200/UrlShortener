import { NextFunction, Request, Response } from "express";
import { urlRepository } from "../repositories/urlRepository";
import {encodeUrl,isValidLink} from "../utils/utils"

const checkUrl=async(req: Request, res: Response) =>{
    const url = req.query.url;
    if (typeof url !== "string")
        res.status(400).json({
            status: 400,
            message: 'Bad request'
        });
    else{
        if(await urlRepository.checkShort(url))
        {
            req.query.shortUrl=url
            return res.redirect(301,`/api/url/short?shortUrl=${url}`)
        }
        if(await urlRepository.checkStatistics(url))
        {
            req.query.statisticsUrl=url
            return res.redirect(301,`/api/url/statistics?statisticsUrl=${url}`)
        }
        res.status(404).json({
            status: 404,
            message: 'Not found'
        });
    }
}
const getBaseUrl = async (req: Request, res: Response, next: NextFunction) => {
    const shortUrl = req.query.shortUrl;
    if (typeof shortUrl !== "string")
        res.status(400).json({
            status: 400,
            message: 'Bad request'
        });
    else {
        const { id, baseUrl } = await urlRepository.getBaseUrl(shortUrl);
        if (id != null) {
            res.locals.urlId = id
            res.locals.baseUrl = baseUrl
            return next()
        }
        res.status(404).json({
            status: 404,
            message: 'Not found'
        })
    }
}
const getStatistics = async(req: Request, res: Response) => {
    const statisticsUrl = req.query.statisticsUrl;
    if (typeof statisticsUrl !== "string")
        res.status(400).json({
            status: 400,
            message: 'Bad request'
        });
    else {
        const result=await urlRepository.getStats(statisticsUrl);
        res.status(200).json(result)
    }
}
const createUrl = async(req: Request, res: Response) => {
    const baseUrl = req.body.baseUrl;
    if (typeof baseUrl !== "string")
        res.status(400).json({
            status: 400,
            message: 'Bad request'
        });
    else {
        try{
            isValidLink(baseUrl)
        }
        catch(err:any){
            return res.status(400).json({
            status: 400,
            message: err.message  
        });
        }
        let shortUrl="",statsUrl=""
        while(true){
        ({shortUrl,statsUrl}=await encodeUrl(baseUrl))
        const isCollision=await urlRepository.checkCollision(shortUrl,statsUrl);
        if(!isCollision)
            break;
        }
        await urlRepository.createUrls(baseUrl, shortUrl, statsUrl);
        res.status(201).json({
            shortUrl: shortUrl,
            statisticsUrl: statsUrl
        })
    }
}

export { getBaseUrl, getStatistics, createUrl,checkUrl }
