import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUrl, handleUrl } from "../services/urlService";
import { AppError } from "../errors/AppError";

const resolveUrl = async (req: Request, res: Response, next: NextFunction) => {
  const url = req.query.url;
  const ip = req.ip,
    userAgent = req.headers["user-agent"];
  if (typeof url !== "string")
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: "Bad request",
    });
  try {
    const result = await handleUrl({ url, ip, userAgent });
    if (result.type === "Short")
      return res.status(StatusCodes.OK).json({
        baseUrl: result.baseUrl,
      });
    else {
      return res.status(StatusCodes.OK).json(result.statistics);
    }
  } catch (err) {
    return next(err);
  }
};

const resolveUrlCreation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const baseUrl = req.body.baseUrl;
  if (typeof baseUrl !== "string")
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: "Bad request",
    });
  else {
    try {
      const { shortUrl, statsUrl } = await createUrl(baseUrl);
      return res.status(StatusCodes.CREATED).json({
        shortUrl: shortUrl,
        statisticsUrl: statsUrl,
      });
    } catch (err) {
      if (err instanceof AppError) {
        if (err.statusCode === StatusCodes.INTERNAL_SERVER_ERROR)
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
          });
      }
      return next(err);
    }
  }
};

export { resolveUrl, resolveUrlCreation };
