import { hash, randomInt } from "node:crypto";
import { Base62 } from "@sindresorhus/base62";
import { RAND_HASH_ADDITION } from "../constants";

const URL_HASH_LENGTH = 12;
const HTTP_REGEX = /^https?:\/{2}/g;
const DOUBLE_SLASH_REGEX = /:\/{2}/g;


export const encodeUrl = async (baseUrl: string) => {
  const hashed = BigInt(
    "0x" +
      hash(
        "sha256",
        baseUrl + Date.now() + randomInt(RAND_HASH_ADDITION),
      ).substring(0, URL_HASH_LENGTH),
  );
  const base62 = new Base62();
  const shortUrl = base62.encodeBigInt(hashed);
  const statsUrl = base62.encodeBigInt(hashed + BigInt(Date.now()));
  return { shortUrl, statsUrl };
};
export const isValidLink = (link: string) => {
  const httpStartingRegex = new RegExp(HTTP_REGEX);
  const httpMatches = link.match(httpStartingRegex);
  if (!httpMatches || httpMatches.length != 1)
    throw new Error("The link should have http/https at the start");
  const slashesRegex = new RegExp(DOUBLE_SLASH_REGEX);
  const slashMatches = link.match(slashesRegex);
  if (!slashMatches || slashMatches.length != 1)
    throw new Error("The link should contain only one pair of slashes");
  if (!link.includes(".")) {
    throw new Error("The link should include a dot");
  }
  return true;
};
