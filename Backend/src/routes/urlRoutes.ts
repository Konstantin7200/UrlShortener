import { Request, Response } from "express";
import app from "../app";

app.get("/",(req:Request,res:Response)=>{
    res.send("<h1>WOrking</h1>")
})
