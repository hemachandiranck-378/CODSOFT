import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { Trash2, ArrowRight } from 'lucide-react';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart animate-fade-in glass-panel">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn btn-primary mt-20">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container animate-fade-in">
      <h2>Shopping Cart</h2>
      
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.product} className="cart-item glass-panel">
              <div className="cart-item-image">
                <img src={item.imageUrl} alt={item.name} />
              </div>
              <div className="cart-item-details">
                <Link to={`/product/${item.product}`}><h3>{item.name}</h3></Link>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                <div className="cart-item-actions">
                  <span className="quantity">Qty: {item.quantity}</span>
                  <button onClick={() => removeFromCart(item.product)} className="btn-remove">
                    <Trash2 size={18} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary glass-panel">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal ({cartItems.length} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} className="btn btn-primary btn-full mt-20">
            Proceed to Checkout <ArrowRight size={18} style={{marginLeft: '8px', verticalAlign: 'middle'}}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
