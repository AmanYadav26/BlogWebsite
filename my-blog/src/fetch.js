import { useState,useEffect } from "react";
const Usefetch = (url) => {

    
    const[ Details, setDetails]=useState(null);
  

    useEffect(()=>{
        fetch(url)
        .then(res =>{
            return res.json();
        }).then(data =>{
            setDetails(data);
        })
    },[url]);

    




    return (Details);
}
 
export default Usefetch;