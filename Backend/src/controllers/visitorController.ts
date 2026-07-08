import { locationAPI } from "../api/locationApi";
import { systemSettingsAPI } from "../api/systemSettingsApi";
import { visitorRepository } from "../repositories/visitorRepository"
import { NextFunction, Request, Response } from "express";

const addVisitor=async (req: Request, res: Response, next: NextFunction) => {
    const location = await locationAPI.getLocation(req.ip!)
    const { browser, os, version } = systemSettingsAPI.getSystemSettings(req.headers["user-agent"])
    await visitorRepository.addVisitor(res.locals.urlId, req.ip||"", browser, version, os, location)
    res.status(200).json({
        baseUrl: res.locals.baseUrl
    })
}

export {addVisitor}