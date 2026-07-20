import pino from "pino";
import { pinoHttp } from "pino-http";
import { EnvConfig } from "./EnvConfig";

const streams = [
  { stream: process.stdout, level: "error" },
  { stream: pino.destination(`./logs/${EnvConfig.LogsPath}`), level: "trace" },
];
const logger = pino(
  {
    level: "trace",
  },
  pino.multistream(streams),
);

//true->no log
const autoLoggingRulesFunction = (req: Request): boolean => {
  if (req.url.trim() === "/") return true;
  return false;
};
const httpLogger = pinoHttp({
  logger: logger,
  autoLogging: {
    ignore: autoLoggingRulesFunction,
  },
});

export { logger, httpLogger };
