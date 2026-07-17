import { locationAPI } from "../api/locationApi";
import { systemSettingsAPI } from "../api/systemSettingsApi";
import { visitorRepository } from "../repositories/visitorRepository"
import { NextFunction, Request, Response } from "express";

const addVisitor=async (req: Request, res: Response, next: NextFunction) => {
    const region = await locationAPI.getLocation(req.ip!)
    const { browser, os, version } = systemSettingsAPI.getSystemSettings(req.headers["user-agent"])
    await visitorRepository.addVisitor({ urlId:res.locals.urlId, ip:req.ip||"", browser,browserVersion:version, os, region})
    res.status(200).json({
        baseUrl: res.locals.baseUrl
    })
}

export {addVisitor}