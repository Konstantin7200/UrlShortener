import pool from "../db"


type VisitorToAdd={
    urlId:string,
    ip:string,
    browserVersion:string,
    browser:string,
    os:string,
    region:string
}

const addVisitor=async({urlId,ip,browser,browserVersion,os,region}:VisitorToAdd)=>{
    await pool.query(`INSERT INTO "Visitors" ("urlId",ip,browser,"browserVersion",os,region) VALUES($1,$2,$3,$4,$5,$6)`,[urlId,ip,browser,browserVersion,os,region])
}
export {addVisitor}