import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "../controllers/urlController";

export type CustomError = Error & {
  status: NumericErrorCodesType;
};
type NumericStatusCodesType = (typeof StatusCodes)[keyof typeof StatusCodes];
type NumericErrorCodesType = Exclude<NumericStatusCodesType, 200 | 201>;
const ErrorMessages: Record<NumericErrorCodesType, string> = {
  400: "Bad request",
  404: "Not found",
  500: "Internal server error",
};
export const globalErrorHandlingMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error({
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
    ip: req.ip,
    status: err.status || 500,
    message: err.message,
    stack: err.stack,
  });
  res.status(err.status).json({
    status: err.status,
    message: ErrorMessages[err.status],
  });
};
