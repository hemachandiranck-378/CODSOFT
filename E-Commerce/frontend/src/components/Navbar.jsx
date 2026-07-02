import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { userInfo, logout } = useAuthStore();
  const { cartItems } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar glass-panel">
      <div className="nav-brand">
        <Link to="/"><h3>NovaShop</h3></Link>
      </div>
      <div className="nav-links">
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/cart" className="nav-link cart-link">
          <ShoppingCart size={20} />
          {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
        </Link>
        {userInfo ? (
          <div className="nav-user">
            <span className="user-name"><User size={18} /> {userInfo.name}</span>
            <button onClick={handleLogout} className="btn-logout" title="Logout"><LogOut size={18} /></button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
