import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCartStore } from '../store/useCartStore';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product", error);
        // Dummy fallback for demo
        const dummyProducts = [
          { _id: '1', name: 'Quantum Pro Laptop', price: 1299, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80', description: 'Experience next-generation computing with the Quantum Pro Laptop. Featuring an ultra-fast processor and stunning 4K display, it is built for professionals who demand the best.', stock: 10 },
          { _id: '2', name: 'Sonic Wireless Earbuds', price: 149, category: 'Audio', imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80', description: 'Immersive sound with active noise cancellation. The Sonic Wireless Earbuds provide 24 hours of playback and a comfortable, ergonomic fit.', stock: 5 },
          { _id: '3', name: 'Nova Smartwatch', price: 299, category: 'Wearables', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', description: 'Track your fitness, receive notifications, and look stylish with the Nova Smartwatch. Water-resistant up to 50 meters.', stock: 0 },
          { _id: '4', name: 'Ultra HD Monitor', price: 499, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80', description: 'A crystal clear 27-inch 4K monitor with ultra-thin bezels. Perfect for gaming, editing, or office work.', stock: 15 },
        ];
        setProduct(dummyProducts.find(p => p._id === id));
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      product: product._id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="loading">Product not found</div>;

  return (
    <div className="product-details-container animate-fade-in">
      <Link to="/products" className="back-link">
        <ArrowLeft size={18} /> Back to Products
      </Link>

      <div className="product-details-grid glass-panel">
        <div className="product-details-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-details-info">
          <span className="product-category">{product.category}</span>
          <h2>{product.name}</h2>
          <div className="product-price-large">${product.price.toFixed(2)}</div>
          
          <div className="product-description">
            <p>{product.description}</p>
          </div>

          <div className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </div>

          {product.stock > 0 && (
            <button 
              className={`btn ${added ? 'btn-success' : 'btn-primary'} btn-large`}
              onClick={handleAddToCart}
              disabled={added}
            >
              {added ? <><Check size={20} style={{marginRight: '8px'}} /> Added to Cart</> : <><ShoppingCart size={20} style={{marginRight: '8px'}} /> Add to Cart</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
