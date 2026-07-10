import { NextFunction, Request, Response } from "express";
import { urlRepository } from "../repositories/urlRepository";
import { hash, randomInt } from "node:crypto";
import { Base62 } from "@sindresorhus/base62";

const encodeUrl = async(baseUrl: string) => {
    while(true){
        let hashed = BigInt("0x" + hash('sha256', baseUrl + Date.now() + randomInt(10000000000)).substring(0, 12))
        const base62 = new Base62();
        let shortUrl = base62.encodeBigInt(hashed);
        let statsUrl = base62.encodeBigInt(hashed + BigInt(Date.now()));
        const colisionExists=await urlRepository.checkCollision(shortUrl,statsUrl);
        if(!colisionExists){
            return {shortUrl,statsUrl}
        }
    }
}
const isValidLink=(link:string)=>{
  let result;
  let httpRegex=new RegExp(/https?:\/{2}/g)
  result=link.match(httpRegex)
  if(!result||result.length!=1)
    throw new Error("The link should contain only one http/https")
  let httpStartingRegex=new RegExp(/^https?:\/{2}/g)
  result=link.match(httpStartingRegex)
  if(!result||result.length!=1)
    throw new Error("The link should have http/https at the start")
  let slashesRegex=new RegExp(/:\/{2}/g)
  result=link.match(slashesRegex)
  if(!result||result.length!=1)
    throw new Error("The link should contain only one pair of slashes")
  if(!link.includes(".")){
    throw new Error("The link should include a dot")
  }
  return true;
}
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
        if (id != -1) {
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
    const baseUrl = req.query.baseUrl;
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
        const {shortUrl,statsUrl}=await encodeUrl(baseUrl)
        await urlRepository.createUrls(baseUrl, shortUrl, statsUrl);
        res.status(201).json({
            shortUrl: shortUrl,
            statisticsUrl: statsUrl
        })
    }
}

export { getBaseUrl, getStatistics, createUrl,checkUrl }