import cors, { CorsOptions } from "cors";
import { EnvConfig } from "../EnvConfig";

const corsOptions: CorsOptions = {
  origin: [EnvConfig.FrontendUrl],
  methods: ["GET", "POST"],
};
const securityHeaders = cors(corsOptions);

export { securityHeaders };
