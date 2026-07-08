import pool from "../db"


export const visitorRepository={
    addVisitor:async(urlId:string,ip:string,browserVersion:string,browser:string,os:string,region:string,)=>{
        await pool.query(`INSERT INTO "Visitors" ("urlId",ip,browser,"browserVersion",os,region) VALUES($1,$2,$3,$4,$5,$6)`,[urlId,ip,browser,browserVersion,os,region])
    }
}
