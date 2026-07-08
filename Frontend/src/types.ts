type statsResponse = {
    type: "stats",
    body: userData[]
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
type userData={
    visitingDate:string,
    ip:string,
    browser:string,
    browserVersion:string,
    region:string,
    os:string
}
export type {statsResponse,redirectResponse,errorResponse,urlResponse,userData}