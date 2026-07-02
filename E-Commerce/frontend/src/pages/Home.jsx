import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container animate-fade-in">
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Premium <span className="text-gradient">Tech Gear</span></h1>
          <p>Elevate your digital lifestyle with our curated collection of high-end accessories and gadgets. Experience the future today.</p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">Shop Now <ArrowRight size={18} style={{marginLeft: '8px', verticalAlign: 'middle'}}/></Link>
            <Link to="/products" className="btn btn-secondary">Explore Categories</Link>
          </div>
        </div>
      </section>

      <section className="features grid-layout">
        <div className="feature-card glass-panel">
          <div className="feature-icon"><Zap size={32} /></div>
          <h3>Lightning Fast Delivery</h3>
          <p>Get your gear when you need it with our expedited shipping options worldwide.</p>
        </div>
        <div className="feature-card glass-panel">
          <div className="feature-icon"><ShieldCheck size={32} /></div>
          <h3>Secure Checkout</h3>
          <p>Your transactions are protected with military-grade encryption.</p>
        </div>
        <div className="feature-card glass-panel">
          <div className="feature-icon"><ShoppingBag size={32} /></div>
          <h3>Premium Quality</h3>
          <p>We source only the best products from top manufacturers globally.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
