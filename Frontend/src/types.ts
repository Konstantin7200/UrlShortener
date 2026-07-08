type statsResponse = {
    type: "stats",
    body: any[]
}
type redirectResponse = {
    type: "redirect",
    body: string
}
type errorResponse = {
    type: "error"
    body: number
}
type urlResponse={
    type:"urls"
    body:{
        shortUrl:string,
        statisticsUrl:string
    }
}
export type {statsResponse,redirectResponse,errorResponse,urlResponse}