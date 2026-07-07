import { UAParser } from "ua-parser-js"


export const systemSettingsAPI = {
    getSystemSettings: (userAgent: string | undefined) => {
        if (!userAgent)
            return {
                browser: "",
                version: "",
                os: ""
            }
        const uaData = UAParser(userAgent)
        return {
            browser: uaData.browser.name||"",
            version:uaData.browser.version||"",
            os: uaData.os.name||"",
        }
    }
}