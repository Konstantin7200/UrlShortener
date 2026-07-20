import { prisma } from "../db/prisma";

const createUrls = async (
  baseUrl: string,
  shortUrl: string,
  statsUrl: string,
) => {
  const url = await prisma.urls.create({
    data: {
      baseUrl,
      shortUrl,
      statisticsUrl: statsUrl,
    },
  });
  return url;
};

const getBaseUrl = async (shortUrl: string) => {
  const url = await prisma.urls.findUnique({
    where: { shortUrl },
    select: { id: true, baseUrl: true },
  });
  if (url) {
    return { id: url.id, baseUrl: url.baseUrl };
  }
  return { id: null, baseUrl: "" };
};

const getStats = async (statsUrl: string) => {
  const url = await prisma.urls.findUnique({
    where: { statisticsUrl: statsUrl },
    select: {
      visitors: {
        select: {
          visitingDate: true,
          ip: true,
          browser: true,
          browserVersion: true,
          region: true,
          os: true,
        },
      },
    },
  });
  return url?.visitors ?? [];
};

const checkCollision = async (shortUrl: string, statsUrl: string) => {
  const url = await prisma.urls.findFirst({
    where: {
      OR: [
        { shortUrl: shortUrl },
        { statisticsUrl: shortUrl },
        { shortUrl: statsUrl },
        { statisticsUrl: statsUrl },
      ],
    },
  });
  return url !== null;
};

const checkShort = async (shortUrl: string) => {
  const url = await prisma.urls.findUnique({ where: { shortUrl } });
  return url !== null;
};

const checkStatistics = async (statsUrl: string) => {
  const url = await prisma.urls.findUnique({
    where: { statisticsUrl: statsUrl },
  });
  return url !== null;
};

export {
  createUrls,
  getStats,
  getBaseUrl,
  checkCollision,
  checkStatistics,
  checkShort,
};
