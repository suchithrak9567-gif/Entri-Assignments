import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import CartItem from "../Components/CartItem";
import { useCart } from "../context/useCart";

function CartPage() {
  const { items, itemCount, subtotal, tax, total } = useCart();

  return (
    <section className="cart-page container">
      <div className="cart-heading">
        <span className="eyebrow">Your little pile of good things</span>
        <h1>Your bag<span className="cart-heading-count"> ({itemCount})</span></h1>
      </div>
      {!items.length ? (
        <div className="empty-cart">
          <span className="empty-cart-icon"><ShoppingBag size={25} /></span>
          <h2>It’s looking a little roomy in here.</h2>
          <p>There are lovely things waiting to find their way home.</p>
          <Link className="button button-dark" to="/products">Find something lovely <ArrowRight size={16} /></Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            <div className="cart-list-heading"><span>Item</span><span>Quantity</span><span>Total</span></div>
            {items.map((item) => <CartItem item={item} key={item.product.id} />)}
            <div className="cart-note"><Sparkles size={16} /><span>Good choice. Every order is packed with a little extra care.</span></div>
          </div>
          <aside className="order-summary">
            <h2>A little summary</h2>
            <div className="summary-line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="summary-line"><span>Estimated tax <small>(8%)</small></span><span>${tax.toFixed(2)}</span></div>
            <div className="summary-line shipping-line"><span>Shipping</span><span>{subtotal >= 75 ? "On us" : "Calculated at checkout"}</span></div>
            <div className="summary-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
            <button className="button button-dark checkout-button" onClick={() => window.alert("Thanks for shopping ShopNest! Checkout will be available soon.")} type="button">Continue to checkout <ArrowRight size={16} /></button>
            <p className="tax-note">Taxes are an estimate. Shipping is calculated at checkout.</p>
            <Link className="continue-shopping" to="/products">← Keep looking around</Link>
          </aside>
        </div>
      )}
    </section>
  );
}

export default CartPage;
