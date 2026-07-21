import { locationAPI } from "../api/locationApi";
import { systemSettingsAPI } from "../api/systemSettingsApi";
import {
  checkCollision,
  checkShort,
  checkStatistics,
  createUrls,
  getBaseUrl,
  getStats,
} from "../repositories/urlRepository";
import { addVisitor } from "../repositories/visitorRepository";
import { encodeUrl, isValidLink } from "../utils/utils";
import { logger } from "../PinoConfig";

type UrlType = "Short" | "Statistics";
type UrlTypeObject = { type: UrlType };

type getShortUrlArgs = {
  shortUrl: string;
  ip: string | undefined;
  userAgent: string | undefined;
};
type handleUrlArgs = {
  url: string;
  ip: string | undefined;
  userAgent: string | undefined;
};
type handleUrlResponseType = Promise<
  | { type: "Short"; baseUrl: string }
  | {
      type: "Statistics";
      statistics: {
        ip: string;
        visitingDate: Date;
        browser: string;
        browserVersion: string;
        region: string;
        os: string;
      }[];
    }
>;
const getShortUrlAndRecordVisit = async ({
  shortUrl,
  ip,
  userAgent,
}: getShortUrlArgs): Promise<string> => {
  const { id, baseUrl } = await getBaseUrl(shortUrl);
  if (id === null) {
    throw Error("Url not found");
  }
  let region = "";
  let ipToStore = "";
  if (ip === undefined) {
    logger.warn({ shortUrl }, "ip is undefined");
    region = "Unknown";
    ipToStore = "Unknown";
  } else {
    ipToStore = ip;
    region = await locationAPI.getLocation(ip);
    if (region === "Unknown")
      logger.warn({ shortUrl, ip }, "Region not determined");
  }
  const { browser, os, version } =
    systemSettingsAPI.getSystemSettings(userAgent);
  await addVisitor({
    urlId: id,
    ip: ipToStore,
    browser,
    browserVersion: version,
    os,
    region,
  });
  return baseUrl;
};
const getStatistics = async (statisticsUrl: string) => {
  const result = await getStats(statisticsUrl);
  return result;
};
const createUrl = async (baseUrl: string) => {
  try {
    isValidLink(baseUrl);
  } catch (err) {
    if (err instanceof Error) throw Error(err.message);
  }
  let shortUrl = "",
    statsUrl = "";
  let tries = 0;
  while (tries < 1000) {
    ({ shortUrl, statsUrl } = await encodeUrl(baseUrl));
    const isCollision = await checkCollision(shortUrl, statsUrl);
    if (!isCollision) break;
    tries++;
  }
  if (tries === 1000) {
    logger.error("The tries limit on url creation was reached");
    throw Error("Url not created");
  }
  if (tries > 0) logger.info(`${tries} tries were spent to create urls`);
  await createUrls(baseUrl, shortUrl, statsUrl);
  return { shortUrl, statsUrl };
};
const getUrlType = async (url: string): Promise<UrlTypeObject> => {
  if (await checkShort(url)) {
    return {
      type: "Short",
    };
  }
  if (await checkStatistics(url)) {
    return {
      type: "Statistics",
    };
  }
  throw new Error("Url not found");
};
const handleUrl = async ({
  url,
  userAgent,
  ip,
}: handleUrlArgs): handleUrlResponseType => {
  let urlType: UrlType | null = null;
  ({ type: urlType } = await getUrlType(url));
  if (urlType === "Short") {
    const baseUrl = await getShortUrlAndRecordVisit({
      shortUrl: url,
      ip: ip,
      userAgent: userAgent,
    });
    return {
      type: "Short",
      baseUrl: baseUrl,
    };
  } else {
    const result = await getStatistics(url);
    return {
      type: "Statistics",
      statistics: result,
    };
  }
};
export {
  getShortUrlAndRecordVisit,
  getStatistics,
  createUrl,
  getUrlType,
  handleUrl,
};
export type { UrlTypeObject, UrlType };
