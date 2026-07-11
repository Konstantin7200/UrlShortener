import { hash, randomInt } from "node:crypto";
import { Base62 } from "@sindresorhus/base62";



export const encodeUrl = async(baseUrl: string) => {
        let hashed = BigInt("0x" + hash('sha256', baseUrl + Date.now() + randomInt(10000000000)).substring(0, 12))
        const base62 = new Base62();
        let shortUrl = base62.encodeBigInt(hashed);
        let statsUrl = base62.encodeBigInt(hashed + BigInt(Date.now()));
        return {shortUrl,statsUrl}
}
export const isValidLink=(link:string)=>{
  let result;
  let httpStartingRegex=new RegExp(/^https?:\/{2}/g)
  result=link.match(httpStartingRegex)
  if(!result||result.length!=1)
    throw new Error("The link should have http/https at the start")
  let slashesRegex=new RegExp(/:\/{2}/g)
  result=link.match(slashesRegex)
  if(!result||result.length!=1)
    throw new Error("The link should contain only one pair of slashes")
  if(!link.includes(".")){
    throw new Error("The link should include a dot")
  }
  return true;
}
