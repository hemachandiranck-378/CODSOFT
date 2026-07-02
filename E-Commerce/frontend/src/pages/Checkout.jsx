import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { CheckCircle } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, clearCart } = useCartStore();
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate('/login?redirect=checkout');
      return;
    }
    
    // Simulate order placement
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="checkout-success animate-fade-in glass-panel">
        <CheckCircle size={64} color="#10b981" className="success-icon" />
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase. You will be redirected to the home page shortly.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container animate-fade-in">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <div className="checkout-form glass-panel">
          <h3>Shipping Information</h3>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label>Address</label>
              <input 
                type="text" 
                className="input-field" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input 
                type="text" 
                className="input-field" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                required 
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Postal Code</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={postalCode} 
                  onChange={(e) => setPostalCode(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={country} 
                  onChange={(e) => setCountry(e.target.value)} 
                  required 
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-full mt-20">Place Order</button>
          </form>
        </div>
        
        <div className="checkout-summary glass-panel">
          <h3>Order Details</h3>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div key={item.product} className="checkout-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total to Pay</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
