import { NextFunction, Request, Response } from "express";
import {
  createUrl,
  getShortUrlAndRecordVisit,
  getStatistics,
  getUrlType,
} from "../services/urlService";
import type { UrlType } from "../services/urlService";

export const StatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

const resolveUrl = async (req: Request, res: Response, next: NextFunction) => {
  const url = req.query.url;
  if (typeof url !== "string")
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: "Bad request",
    });
  else {
    let urlType: UrlType | null = null;
    try {
      ({ type: urlType } = await getUrlType(url));
    } catch (err) {
      if (err instanceof Error) {
        res.status(StatusCodes.NOT_FOUND).json({
          status: StatusCodes.NOT_FOUND,
          message: err.message,
        });
      }
      return;
    }
    if (urlType === "Short") {
      try {
        const result = await getShortUrlAndRecordVisit({
          shortUrl: url,
          ip: req.ip,
          userAgent: req.headers["user-agent"],
        });
        res.status(StatusCodes.OK).json({
          baseUrl: result,
        });
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === "Url not found") {
            res.status(StatusCodes.NOT_FOUND).json({
              status: StatusCodes.NOT_FOUND,
              message: err.message,
            });
          } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              status: StatusCodes.INTERNAL_SERVER_ERROR,
              message: err.message,
            });
          }
        }
      }
    } else {
      const result = await getStatistics(url);
      res.status(StatusCodes.OK).json(result);
    }
  }
};

const resolveUrlCreation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const baseUrl = req.body.baseUrl;
  if (typeof baseUrl !== "string")
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: "Bad request",
    });
  else {
    try {
      const { shortUrl, statsUrl } = await createUrl(baseUrl);
      res.status(StatusCodes.CREATED).json({
        shortUrl: shortUrl,
        statisticsUrl: statsUrl,
      });
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "Url not found") {
          res.status(StatusCodes.NOT_FOUND).json({
            status: StatusCodes.NOT_FOUND,
            message: err.message,
          });
        }
        if (err.message === "Url not created")
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err.message,
          });
        else
          res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: err.message,
          });
      }
    }
  }
};

export { resolveUrl, resolveUrlCreation };
