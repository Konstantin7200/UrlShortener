import { GEO_UNKNOWN } from "src/constants";

type locationApiData = {
  country: string;
  city: string;
  regionName: string;
};
export async function getLocation(ip: string) {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    if (!response.ok) {
      return GEO_UNKNOWN;
    }
    const data = (await response.json()) as locationApiData;
    if (!data.country || !data.city) {
      return GEO_UNKNOWN;
    }
    const result = `${data.country},${data.city}`;
    return result;
  } catch (err) {
    return GEO_UNKNOWN;
  }
}
