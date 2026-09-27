function Product({ name,price,instock}){
    return(

    <div>
        <h4>{name}</h4>
        <p>price : {price}</p>
        <p>{instock ? "in stock" : "Out Stock"}</p>
    </div>
    );
}
export default Product;