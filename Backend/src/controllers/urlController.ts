import { NextFunction, Request, Response } from "express";
import { createUrl, handleUrl } from "../services/urlService";

export const StatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

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
    if (err instanceof Error) {
      if (err.message === "Url not found") {
        return res.status(StatusCodes.NOT_FOUND).json({
          status: StatusCodes.NOT_FOUND,
          message: err.message,
        });
      }
    }
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Internal server error",
  });
};

const resolveUrlCreation = async (req: Request, res: Response) => {
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
      if (err instanceof Error) {
        if (err.message === "Url not created")
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
          });
        else
          return res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: err.message,
          });
      }
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
    });
  }
};

export { resolveUrl, resolveUrlCreation };
