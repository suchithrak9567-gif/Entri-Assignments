import {useState} from 'react';
import form from "react-bootstrap/Form";
function ControlledComp() {
    const [username,setUsername] = useState("");
    return (
        <>
        <input onChange={(e)=>setUsername(e.target.value)} value={username} type="text" placeholder='Enter your name' />
        <p>Your name is: {username}</p>
        </>
    );
}
export default ControlledComp;