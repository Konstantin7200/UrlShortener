import { locationAPI } from "../api/locationApi";
import { systemSettingsAPI } from "../api/systemSettingsApi";
import { UrlTypeObject } from "../controllers/urlController";
import { checkCollision, checkShort, checkStatistics, createUrls, getBaseUrl, getStats } from "../repositories/urlRepository";
import { addVisitor } from "../repositories/visitorRepository";
import { encodeUrl, isValidLink } from "../utils/utils";

type getShortUrlArgs = {
    shortUrl: string, 
    ip: string,
    userAgent: string|undefined
}
const getShortUrlAndRecordVisit = async ({shortUrl, ip, userAgent}:getShortUrlArgs):Promise<string> => {
    const { id, baseUrl } = await getBaseUrl(shortUrl);
    if (id === null) {
        throw Error("Url not found")
    }
    let region = ""
    try {
        region = await locationAPI.getLocation(ip)
    }
    catch (e) {
        throw Error("External API error")
    }
    const { browser, os, version } = systemSettingsAPI.getSystemSettings(userAgent)
    await addVisitor({ urlId: id,ip, browser, browserVersion: version, os, region })
    return baseUrl;
}
const getStatistics = async (statisticsUrl: string) => {
    const result = await getStats(statisticsUrl);
    return result;
}
const createUrl = async (baseUrl: string) => {
    try {
        isValidLink(baseUrl)
    }
    catch (err) {
        if (err instanceof Error)
            throw Error(err.message)
    }
    let shortUrl = "", statsUrl = ""
    let tries=0;
    while (tries < 1000) {
        ({ shortUrl, statsUrl } = await encodeUrl(baseUrl))
        const isCollision = await checkCollision(shortUrl, statsUrl);
        if (!isCollision)
            break;
        tries++;
    }
    if(tries===1000){
        throw Error("Url not created");
    }
    await createUrls(baseUrl, shortUrl, statsUrl);
    return { shortUrl, statsUrl }
}
const getUrlType = async (url: string): Promise<UrlTypeObject> => {
    if (await checkShort(url)) {
        return {
            type: "Short"
        }
    }
    if (await checkStatistics(url)) {
        return {
            type: "Statistics"
        }
    }
    throw new Error("Url not found")
}
export { getShortUrlAndRecordVisit, getStatistics, createUrl, getUrlType }
/*const getBaseUrl = async (req: Request, res: Response, next: NextFunction) => {
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
}*/