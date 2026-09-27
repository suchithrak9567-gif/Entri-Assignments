import {useState,useEffect} from "react";
import CounterButton  from "./CounterButton";
function CountApp(){
    //state
    const [count,setCount] = useState(0);
    // function handleincrement(){
    //     setCount(count + 1);
    // }
    useEffect(()=>{
        console.log("component loaded");
        
    });
    //only once
    useEffect(()=>{
        console.log("component loaded,only once");

    },[]);

    useEffect(()=>{
        console.log("component loaded,state changed");
    },[count]);

    useEffect(()=>{
        console.log("component");
        return ()=>{
            console.log("component unmounted");
        };
    },[]);

    return (
        <>
        <h1>Count: {count}</h1>
        <CounterButton handleIncrement={()=>setCount(count + 1)} 
            label={"Increment"}/>
            <CounterButton handleIncrement={()=>setCount(0)} label={"Reset"}/>
                <CounterButton handleIncrement={()=>setCount(count - 1)} label={"Decrement"}/>
                    <button onClick={()=>setCount(count + 1)}>Increment by 5</button>
                    <button onClick={()=>setCount(count - 1)}>Decrement by 5</button>
                    <button onClick={()=>setCount(0)}>Reset</button>
        </>
    )
        

}
export default CountApp;