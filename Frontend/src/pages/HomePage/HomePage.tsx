import { useState } from "react"


export const HomePage = () => {
    const [input, setInput] = useState("")
    return (
        <div className="flex flex-col pt-2 pb-16 items-center w-full min-h-screen gap-y-12 desktop:py-36">
            <h1 className="text-black text-4xl desktop:text-5xl">Welcome to link shortener</h1>
            <div className="w-8/10 desktop:w-2/3 flex flex-col gap-y-2">
                <label htmlFor="urlInput" className="px-1 text-xl mt-48 desktop:mt-32">Put the link here</label>
                <input value={input} onChange={(e) => setInput(e.target.value)} id="urlInput" className="p-4 text-xl rounded-xl border border-black outline-none shadow-md w-full" />
                <button className={`p-4 ${input.trim().length === 0 ? "bg-gray-300" : "bg-gray-600"} cursor-pointer duration-300 hover:${input.trim().length !== 0 && "bg-black"} rounded-3xl text-white text-2xl`} onClick={alert} disabled={input.trim().length === 0}>Create short link</button>
            </div>
            <div className="flex flex-col gap-8 desktop:flex-row w-full">
                <div className="bg-zinc-400 flex-col text-2xl flex items-center w-full h-12">
                    <h2>Short link</h2>
                    <p></p>
                </div>
                <div className="bg-zinc-400 flex-col text-2xl flex items-center w-full h-12">
                    <h2>Statistics link</h2>
                    <p></p>
                </div>
            </div>
        </div>
    )
}