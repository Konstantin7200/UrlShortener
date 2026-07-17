import { EnvConfig } from "./config";
import type { errorResponse, redirectResponse, statsResponse, urlResponse } from "./types";

const APIBase = EnvConfig.ApiUrl
export const API = {
    async getUrlData(url: string): Promise<statsResponse | redirectResponse | errorResponse> {
        const params = new URLSearchParams({ url: url })
        const response = await fetch(`${APIBase}/api/url?${params}`)
        if (response.status != 200) {
            let message:string="";
            try{
                let data=await response.json()
                message=data.message
            }
            catch{}
            return {
                type: "error",
                code:response.status,
                message: message
            };
        }
        const data = await response.json()
        if (Array.isArray(data))
            return {
                type: "stats",
                body: data
            }
        return {
            type: "redirect",
            body: data.baseUrl
        }
    },
    async createNewUrl(baseUrl: string):Promise<errorResponse|urlResponse> {
        const response = await fetch(`${APIBase}/api/url`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ baseUrl })
        })
        if (response.status != 201){
            let message:string="";
            try{
                let data=await response.json()
                message=data.message
            }
            catch{}
            return {
                type: "error",
                code: response.status,
                message:message
            };
        }
        const data=await response.json()
        return{
            type:"urls",
            body:data
        }
            
    }
}