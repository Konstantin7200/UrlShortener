import { prisma } from "../db/prisma";

type VisitorToAdd = {
  urlId: number;
  ip: string;
  browserVersion: string;
  browser: string;
  os: string;
  region: string;
};

const addVisitor = async ({
  urlId,
  ip,
  browser,
  browserVersion,
  os,
  region,
}: VisitorToAdd) => {
  await prisma.visitors.create({
    data: {
      urlId,
      ip,
      browser,
      browserVersion,
      os,
      region,
    },
  });
};

export { addVisitor };
