import { NextFunction, Response, Request } from "express";
import { logger } from "../PinoConfig";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../errors/AppError";

export const globalErrorHandlingMiddleware = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = null
  if (err instanceof AppError)
    statusCode = err.statusCode
  if (statusCode != null) {
    logger.error(
      {
        message: err.message,
        stack: err.stack,
        name: err.name,
        path: req.path,
        method: req.method,
        ip: req.ip,
        statusCode: statusCode
      },
      "Unhandled error occurred",
    );
    res.status(statusCode).json({
      status: statusCode,
      message: err.message,
    });
  }
  else {
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
  }
};
