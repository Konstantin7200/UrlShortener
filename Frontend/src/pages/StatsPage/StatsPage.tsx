import type { FC } from "react"
import type { userData } from "../../types"
import { useSelector } from "react-redux"
import type { RootStateType } from "../../store/store"

export const StatsPage=()=>{
    const stats=useSelector((state:RootStateType)=>state.stats.stats)
    return (
        <div className="flex flex-col items-center m-18">
            <h1 className="text-3xl">Statistics of visitors</h1>
            <div className="grid grid-cols-6 bg-black gap-0.25 border border-black">
                <p className="bg-white px-2">Visitng date</p>
                <p className="bg-white px-2">Ip</p>
                <p className="bg-white px-2">Browser</p>
                <p className="bg-white px-2">Browser version</p>
                <p className="bg-white px-2">Region</p>
                <p className="bg-white px-2">Os</p>
                {stats.map((userData,index)=><UserDataCont key={index} data={userData}/>)}
            </div>
        </div>
    )
}

interface UserDataContProps{
    data:userData
}
const UserDataCont:FC<UserDataContProps>=({data})=>{
    return(<>
        {Object.entries(data).map((entry)=><p className="bg-white px-2" key={entry[0]}>{entry[1]}</p>)}
    </>)
}