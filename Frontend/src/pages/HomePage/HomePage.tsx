import { useState } from "react"
import { API } from "../../endpoints"


export const HomePage = () => {
    const handleClick=async()=>{
        const data=await API.createNewUrl(input.trim());
        setError("")
        if(data.type==="urls")
        {
            setStatsLink(data.body.statisticsUrl)
            setShortLink(data.body.shortUrl)
        }
        if(data.type==="error"){
            setError(data.message)
        }
    }
    const [input, setInput] = useState("")
    const [error,setError]=useState("")
    const [statsLink,setStatsLink]=useState("")
    const [shortLink,setShortLink]=useState("")
    return (
        <div className="flex flex-col pt-2 pb-16 items-center w-full min-h-screen gap-y-12 desktop:py-36">
            <h1 className="text-black text-4xl desktop:text-5xl">Welcome to link shortener</h1>
            <div className="w-8/10 desktop:w-2/3 flex flex-col gap-y-2 mt-36 desktop:mt-20">
                <h1 className="text-3xl text-red-900 self-center">{error}</h1>
                <label htmlFor="urlInput" className="px-1 text-xl ">Put the link here</label>
                <input value={input} onChange={(e) => setInput(e.target.value)} id="urlInput" className="p-4 text-xl rounded-xl border border-black outline-none shadow-md w-full" />
                <button className={`p-4 ${input.trim().length === 0 ? "bg-gray-300" : "bg-gray-600"} cursor-pointer duration-300 hover:${input.trim().length !== 0 && "bg-black"} rounded-3xl text-white text-2xl`} onClick={handleClick} disabled={input.trim().length === 0}>Create short link</button>
            </div>
            <div className="flex flex-col items-center justify-center gap-8 desktop:flex-row w-full">
                <div className="border border-zinc-400 shadow-sm rounded-md flex-col text-2xl flex items-center w-9/10 p-4 desktop:w-1/4">
                    <h2>Short link</h2>
                    <p>{shortLink}</p>
                </div>
                <div className="border border-zinc-400 shadow-sm rounded-md flex-col text-2xl flex items-center w-9/10 p-4 desktop:w-1/4">
                    <h2>Statistics link</h2>
                    <p>{statsLink}</p>
                </div>
            </div>
        </div>
    )
}