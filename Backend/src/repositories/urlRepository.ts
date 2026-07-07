import pool from "../db"



export const urlRepository={
    createUrls:async(baseUrl:string,shortUrl:string,statsUrl:string)=>{
        const response=await pool.query(`INSERT INTO "Urls"("baseUrl","shortUrl","statisticsUrl") VALUES($1,$2,$3) RETURNING *`,[baseUrl,shortUrl,statsUrl]);
        return response.rows[0]
    },
    getBaseUrl:async(shortUrl:string)=>{
        const response=await pool.query(`SELECT id,"baseUrl" FROM "Urls" WHERE "shortUrl"=$1`,[shortUrl])
        if(response.rows[0])
        {
            const {id,baseUrl}=response.rows[0]
            return {id,baseUrl}
        }
        return {id:-1,baseUrl:""}
    },
    getStats:async(statsUrl:string)=>{
        const response=await pool.query(`SELECT "visitingDate",ip,browser,"browserVersion",region,os FROM "Visitors" INNER JOIN "Urls" ON "Urls".id="Visitors"."urlId" WHERE "statisticsUrl"=$1`,[statsUrl])
        return response.rows
   },
   checkCollision:async(shortUrl:string,statsUrl:string)=>{
        const response=await pool.query(`SELECT * FROM "Urls" WHERE "statisticsUrl"=$1 OR "shortUrl"=$1 OR "statisticsUrl"=$2 OR "shortUrl"=$2`,[shortUrl,statsUrl])
        return response.rows.length!==0
   },
   checkShort:async(shortUrl:string)=>{
        const response=await pool.query(`SELECT * FROM "Urls" WHERE "shortUrl"=$1`,[shortUrl])
        return response.rows.length!==0
   },
   checkStatistics:async(statsUrl:string)=>{
        const response=await pool.query(`SELECT * FROM "Urls" WHERE "statisticsUrl"=$1`,[statsUrl])
        return response.rows.length!==0
   },
}