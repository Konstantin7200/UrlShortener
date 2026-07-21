import { hash, randomInt } from "node:crypto";
import { Base62 } from "@sindresorhus/base62";
import { RAND_HASH_ADDITION } from "src/constants";

export const encodeUrl = async (baseUrl: string) => {
  const hashed = BigInt(
    "0x" +
      hash("sha256", baseUrl + Date.now() + randomInt(RAND_HASH_ADDITION)).substring(
        0,
        12,
      ),
  );
  const base62 = new Base62();
  const shortUrl = base62.encodeBigInt(hashed);
  const statsUrl = base62.encodeBigInt(hashed + BigInt(Date.now()));
  return { shortUrl, statsUrl };
};
export const isValidLink = (link: string) => {
  let result;
  const httpStartingRegex = new RegExp(/^https?:\/{2}/g);
  result = link.match(httpStartingRegex);
  if (!result || result.length != 1)
    throw new Error("The link should have http/https at the start");
  const slashesRegex = new RegExp(/:\/{2}/g);
  result = link.match(slashesRegex);
  if (!result || result.length != 1)
    throw new Error("The link should contain only one pair of slashes");
  if (!link.includes(".")) {
    throw new Error("The link should include a dot");
  }
  return true;
};
