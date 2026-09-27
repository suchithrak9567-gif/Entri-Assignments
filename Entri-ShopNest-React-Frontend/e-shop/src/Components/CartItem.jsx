import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <article className="cart-item">
      <Link className="cart-item-image" to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="cart-item-info">
        <span className="product-category">{product.category}</span>
        <Link className="product-title-link" to={`/products/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <span className="cart-item-price">${product.price.toFixed(2)} each</span>
      </div>
      <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
        <button
          aria-label="Decrease quantity"
          disabled={quantity <= 1}
          onClick={() => updateQuantity(product.id, quantity - 1)}
          type="button"
        >
          <Minus size={14} />
        </button>
        <span aria-live="polite">{quantity}</span>
        <button
          aria-label="Increase quantity"
          onClick={() => updateQuantity(product.id, quantity + 1)}
          type="button"
        >
          <Plus size={14} />
        </button>
      </div>
      <strong className="cart-line-total">${(product.price * quantity).toFixed(2)}</strong>
      <button
        aria-label={`Remove ${product.name} from cart`}
        className="remove-button"
        onClick={() => removeFromCart(product.id)}
        type="button"
      >
        <Trash2 size={17} />
      </button>
    </article>
  );
}

export default CartItem;
