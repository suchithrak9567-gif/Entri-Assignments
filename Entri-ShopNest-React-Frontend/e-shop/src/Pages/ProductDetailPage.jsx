import { ArrowLeft, Check, Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import StatusMessage from "../Components/StatusMessage";
import { useCart } from "../context/useCart";
import { useProducts } from "../context/useProducts";

function ProductDetailPage() {
  const { id } = useParams();
  const { products, loading, error, reloadProducts } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const product = products.find((item) => String(item.id) === id);

  if (loading) return <section className="container detail-state"><Loading /></section>;
  if (error) return <section className="container detail-state"><StatusMessage message={error} onRetry={reloadProducts} /></section>;
  if (!product) {
    return (
      <section className="container detail-state">
        <StatusMessage
          title="We can’t find that one"
          message="This product may have moved on to a new home."
        />
        <Link className="button button-dark detail-back" to="/products"><ArrowLeft size={16} /> Back to the collection</Link>
      </section>
    );
  }

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <section className="product-detail container">
      <Link className="back-link" to="/products"><ArrowLeft size={15} /> Back to all good things</Link>
      <div className="detail-layout">
        <div className="detail-image-wrap">
          <img alt={product.name} className="detail-image" src={product.image} />
          <span className="detail-image-badge"><Heart size={14} /> Picked with care</span>
        </div>
        <div className="detail-copy">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="detail-rating"><span><Star size={15} fill="currentColor" /> {product.rating.toFixed(1)}</span><span>{product.reviewCount || "A few"} happy reviews</span></div>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>
          <div className="detail-rule" />
          <div className="detail-stock"><span className="stock-dot" /> Ready for its new home</div>
          <div className="detail-buy-row">
            <div className="quantity-control detail-quantity" aria-label="Choose quantity">
              <button aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((count) => count - 1)} type="button"><Minus size={14} /></button>
              <span aria-live="polite">{quantity}</span>
              <button aria-label="Increase quantity" onClick={() => setQuantity((count) => count + 1)} type="button"><Plus size={14} /></button>
            </div>
            <button className="button button-dark add-to-bag" onClick={handleAdd} type="button">
              {added ? <><Check size={17} /> Added to your bag</> : <><ShoppingBag size={17} /> Add to your bag</>}
            </button>
          </div>
          <p className="detail-shipping"><Check size={15} /> Complimentary shipping on orders over $75</p>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;
