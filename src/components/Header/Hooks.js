import React , { useEffect, useState } from "react";

function  useDebounce(searchVal, delay) {
    const [value, setValue] = useState(searchVal);
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setValue(searchVal)
        }, delay);
        return () => {
            clearTimeout(timer);
        }
    },[searchVal]);
    return value;
}

export {
    useDebounce
}