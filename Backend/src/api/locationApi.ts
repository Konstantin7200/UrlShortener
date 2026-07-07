
type locationApiData={
    country:string,
    city:string,
    regionName:string,
}
export const locationAPI={
    getLocation:async(ip:string)=>{
        const response=await fetch(`http://ip-api.com/json/${ip}`)
        const data=await response.json() as locationApiData
        const result=`${data.country},${data.city}`
        return result;
    }
}
