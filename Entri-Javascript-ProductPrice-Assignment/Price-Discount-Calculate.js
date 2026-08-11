var Product = "Headphone";
let Basicprice = 800;
let discountPercent = 10;
let TaxPrice = 18;
let Stockstatus = "in_stock";

// Discount
function calculateDiscountedPrice(price, discount) {
    return price - (price * discount / 100);
}
let DiscountPrice = calculateDiscountedPrice(Basicprice, discountPercent);

// Tax
function calculateTax(price, taxRate) {
    return price * taxRate / 100;
}
let Taxamount = calculateTax(DiscountPrice, TaxPrice);

// Final Price
function calculateFinalPrice(price, discount, taxRate) {
    let DiscountPrice = calculateDiscountedPrice(price, discount);
    let Taxamount = calculateTax(DiscountPrice, taxRate);
    return DiscountPrice + Taxamount;
}
let final = calculateFinalPrice(Basicprice, discountPercent, TaxPrice);

// Shipping
function isFreeShipping(finalPrice) {
    if (finalPrice >= 500) {
        return "Free Shipping";
    } else {
        return "Shipping: Rs.49";
    }
}
let shipping = isFreeShipping(final);

// Stock
function getStockMessage(status) {
    switch (status) {
        case "in_stock":
            return "In Stock";
        case "limited":
            return "Limited Stock";
        case "out_of_stock":
            return "Out of Stock";
        default:
            return "Invalid Status";
    }
}
let Stock = getStockMessage(Stockstatus);

// Output
console.log("Product:", Product);
console.log("Basic Price:", Basicprice);
console.log("Discount Price:", DiscountPrice);
console.log("Tax Amount:", Taxamount);
console.log("Final:", final);
console.log("Shipping:", shipping);
console.log("Stock:", Stock);