import { GEO_UNKNOWN } from "../constants";
import { logger } from "../PinoConfig";

type locationApiData = {
  country: string;
  city: string;
  regionName: string;
};
export async function getLocation(ip: string) {
  const response = await fetch(`http://ip-api.com/json/${ip}`);
  if (!response.ok) {
    throw new Error(`Geolocation API responded with ${response.status}` );
  }
  const raw: unknown = await response.json();
  const data = raw as locationApiData;
  if (!data.country || !data.city) {
    logger.warn({ ip }, "Geolocation returned empty fields");
    return GEO_UNKNOWN;
  }
  const result = `${data.country},${data.city}`;
  return result;
}
