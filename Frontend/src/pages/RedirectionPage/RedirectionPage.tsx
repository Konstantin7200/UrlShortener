import { useEffect, useState } from "react"
import { redirect, useNavigate, useParams } from "react-router"
import { API } from "../../endpoints"
import { useDispatch } from "react-redux"
import { setStats } from "../../store/statsSlice"

export const RedirectionPage=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const params=useParams()
    useEffect(()=>{
        async function fetchData() {
            const data=await API.getUrlData(params.url!)
            if(data.type==="redirect"){
                redirect(data.body);
            }
            if(data.type==="stats"){
                dispatch(setStats(data.body))
                navigate("/stats")
            }
        }
        fetchData()
    },[params.url])
    return(
        <div className="h-screen w-screen flex-col gap-2 flex items-center justify-center">
            <div className="flex flex-row">
            <h1 className="text-3xl">You are being redirected</h1>
            <DotLoader/>
            </div>
            <h2 className="text-2xl">Please wait</h2>
        </div>
    )
}

const DotLoader=()=>{
    const dotMap={
        0:"",
        1:".",
        2:"..",
        3:"..."
    } as const
    type keys=keyof typeof dotMap
    const [dotsAmount,setDotsAmount]=useState<keys>(0);
    const length=Object.keys(dotMap).length;
    useEffect(()=>{
        const intervalId=setInterval(()=>{
            setDotsAmount((prev)=>(prev+1)%length as keys)
        },400)
        return ()=>{
            clearInterval(intervalId)
        }
    },[])
    return(
        <p className="min-w-12 text-3xl">{dotMap[dotsAmount]}</p>
    )
}