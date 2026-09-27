import {useState} from "react";
import "./app.css";
import Navbar from "./Navbar";
import Product from "./Product";

function App (){
    const product=[
        {
            id:1,
            name:"Iphone 17",
            price:135000,
            instock:true,
        },
                {
            id:2,
            name:"Iphone 15",
            price:65000,
            instock:true,
        },

                {
            id:3,
            name:"Iphone 12 mini",
            price:45000,
            instock:false,
        },
    ];
    return(
        <>
        <Navbar/>
        <h1>Welcome to e-shop</h1>
        {products.map((product)=>(
            <Product key={product.id} name={product.name} price={product.price} instock={product.instock}/>
        ))}
        </>
    )
}
export default App;