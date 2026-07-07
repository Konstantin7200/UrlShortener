import pool from "../db"


export const visitorRepository={
    addUser:(urlId:string,ip:string,browserVersion:string,browser:string,os:string,region:string,)=>{
        pool.query(`INSERT INTO "Visitors" ("urlId",ip,browser,"browserVersion",os,region) VALUES($1,$2,$3,$4,$5,$6)`,[urlId,ip,browser,browserVersion,os,region])
    }
}

/*
"urlId" INTEGER NOT NULL REFERENCES public."Urls"(id) ON DELETE CASCADE,
    "visitingDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "ip" TEXT NOT NULL,
    "browser" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "os" TEXT NOT NULL*/