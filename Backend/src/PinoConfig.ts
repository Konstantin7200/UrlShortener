import pino from "pino";

//true->no log
export const autoLoggingRulesFunction = (req: Request): boolean => {
  if (req.url.trim() === "/") return true;
  return false;
};
export const logger = pino();
