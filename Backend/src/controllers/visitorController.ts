import { locationAPI } from "../api/locationApi";
import { systemSettingsAPI } from "../api/systemSettingsApi";
import { visitorRepository } from "../repositories/visitorRepository"
import { NextFunction, Request, Response } from "express";

 
 
 
const addVisitor=async (req: Request, res: Response, next: NextFunction) => {
    const location = await locationAPI.getLocation(req.ips[0])
    const { browser, os, version } = await systemSettingsAPI.getSystemSettings(req.headers["user-agent"])
    visitorRepository.addVisitor(res.locals.urlId, req.ips[0], browser, version, os, location)
    res.status(201).json({
        baseUrl: res.locals.baseUrl
    })
}

export {addVisitor}