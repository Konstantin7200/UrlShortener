import { NextFunction, Response, Request } from "express";
import { logger } from "../PinoConfig";
import { StatusCodes } from "src/services/urlService";

export const globalErrorHandlingMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(
    {
      message: err.message,
      stack: err.stack,
      name: err.name,
      path: req.path,
      method: req.method,
      ip: req.ip,
    },
    "Unhandled error occurred",
  );
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Internal server error",
  });
};
