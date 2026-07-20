import { NextFunction, Response, Request } from "express";
import { logger } from "../PinoConfig";

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
  res.status(500).json({
    status: 500,
    message: "Internal server error",
  });
};
