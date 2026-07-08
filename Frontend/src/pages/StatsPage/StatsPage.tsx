import type { FC } from "react"
import type { userData } from "../../types"
import { useSelector } from "react-redux"
import type { RootStateType } from "../../store/store"

export const StatsPage=()=>{
    const stats=useSelector((state:RootStateType)=>state.stats.stats)
    return (
        <div className="grid grid-cols-6">
            {stats.map((userData,index)=><UserDataCont key={index} data={userData}/>)}
        </div>
    )
}

interface UserDataContProps{
    data:userData
}
const UserDataCont:FC<UserDataContProps>=({data})=>{
    return(<>
        {Object.entries(data).map((entry)=><p key={entry[0]}>{entry[1]}</p>)}
    </>)
}