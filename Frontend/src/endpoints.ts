import type { errorResponse, redirectResponse, statsResponse, urlResponse } from "./types";

const APIBase = import.meta.env.VITE_API_URL||""
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
        const params = new URLSearchParams({ baseUrl: baseUrl })
        const response = await fetch(`${APIBase}/api/url?${params}`, {
            method: 'POST'
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