import { NextFunction, Request, Response } from "express";
import { encodeUrl, isValidLink } from "../utils/utils"
import { createUrl, getShortUrlAndRecordVisit, getStatistics, getUrlType } from "../services/urlService";


type UrlType = "Short" | "Statistics"
export type UrlTypeObject = {
    type: UrlType
}

const STATUS_CODES={
    OK:200,
    CREATED:201,
    BAD_REQUEST:400,
    NOT_FOUND:404,
    INTERNAL_SERVER_ERROR:500
} as const

const resolveUrl = async (req: Request, res: Response) => {
    const url = req.query.url;
    if (typeof url !== "string")
        res.status(STATUS_CODES.BAD_REQUEST).json({
            status: STATUS_CODES.BAD_REQUEST,
            message: 'Bad request'
        });
    else {
        let urlType: UrlType | null = null
        try {
            ({ type: urlType } = await getUrlType(url))
        }
        catch (err) {
            if (err instanceof Error)
                return res.status(STATUS_CODES.NOT_FOUND).json({
                    status: STATUS_CODES.NOT_FOUND,
                    message: 'Not found'
                });
            return;
        }
        if (urlType === "Short") {
            try {
                const result = await getShortUrlAndRecordVisit({ shortUrl: url, ip: req.ip || "", userAgent: req.headers["user-agent"] });
                res.status(STATUS_CODES.OK).json({
                    baseUrl: result
                })
            }
            catch (err) {
                if (err instanceof Error) {
                    if (err.message === "Url not found")
                        return res.status(STATUS_CODES.NOT_FOUND).json({
                            status: STATUS_CODES.NOT_FOUND,
                            message: 'Url not found'
                        });
                    else {
                        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(
                            {
                                status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                                message: 'Internal server error'
                            }
                        )
                    }
                }
            }
        }
        else {
            const result = await getStatistics(url);
            res.status(STATUS_CODES.OK).json(result)
        }
    }
}

const resolveUrlCreation = async (req: Request, res: Response) => {
    const baseUrl = req.body.baseUrl;
    if (typeof baseUrl !== "string")
        res.status(STATUS_CODES.BAD_REQUEST).json({
            status: STATUS_CODES.BAD_REQUEST,
            message: 'Bad request'
        });
    else {
        try {
            const { shortUrl, statsUrl } = await createUrl(baseUrl)
            res.status(STATUS_CODES.CREATED).json({
                shortUrl: shortUrl,
                statisticsUrl: statsUrl
            })
        }
        catch (err) {
            if (err instanceof Error) {
                if (err.message === "Url not found")
                    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(
                        {
                            status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                            message: 'Internal server error'
                        }
                    )
                else res.status(STATUS_CODES.BAD_REQUEST).json({
                    status: STATUS_CODES.BAD_REQUEST,
                    message: err.message
                });
            }
        }
    }
}

export { resolveUrl, resolveUrlCreation }