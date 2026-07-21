import { EnvConfig } from "../EnvConfig";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global { var prisma: PrismaClient | undefined }

const globalForPrisma = globalThis 

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(EnvConfig.DatabaseUrl),
  });

globalForPrisma.prisma = prisma;
