import { useEffect } from "react"

export const changeTitle = (title) => {
    useEffect(()=>{
       document.title = title;
    },[title])
    }
