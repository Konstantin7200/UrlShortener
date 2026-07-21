import { hash, randomInt } from "node:crypto";
import { Base62 } from "@sindresorhus/base62";
import { RAND_HASH_ADDITION } from "../constants";

export const encodeUrl = async (baseUrl: string) => {
  const hashed = BigInt(
    "0x" +
      hash(
        "sha256",
        baseUrl + Date.now() + randomInt(RAND_HASH_ADDITION),
      ).substring(0, 12),
  );
  const base62 = new Base62();
  const shortUrl = base62.encodeBigInt(hashed);
  const statsUrl = base62.encodeBigInt(hashed + BigInt(Date.now()));
  return { shortUrl, statsUrl };
};
export const isValidLink = (link: string) => {
  const httpStartingRegex = new RegExp(/^https?:\/{2}/g);
  const httpMatches = link.match(httpStartingRegex);
  if (!httpMatches || httpMatches.length != 1)
    throw new Error("The link should have http/https at the start");
  const slashesRegex = new RegExp(/:\/{2}/g);
  const slashMatches = link.match(slashesRegex);
  if (!slashMatches || slashMatches.length != 1)
    throw new Error("The link should contain only one pair of slashes");
  if (!link.includes(".")) {
    throw new Error("The link should include a dot");
  }
  return true;
};
