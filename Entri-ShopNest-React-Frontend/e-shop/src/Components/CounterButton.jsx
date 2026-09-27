import App from "../App"

function counterbutton({handleIncrement, label}){
    return(
        <>
<button onClick={handleIncrement}>{label}</button>
        </>
    )
}
export default counterbutton;