import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Filter, Search } from 'lucide-react';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Dummy products if backend is not seeded
  const dummyProducts = [
    { _id: '1', name: 'Quantum Pro Laptop', price: 1299, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80', description: 'Next-gen computing.' },
    { _id: '2', name: 'Sonic Wireless Earbuds', price: 149, category: 'Audio', imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80', description: 'Immersive sound.' },
    { _id: '3', name: 'Nova Smartwatch', price: 299, category: 'Wearables', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', description: 'Track your life.' },
    { _id: '4', name: 'Ultra HD Monitor', price: 499, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80', description: 'Crystal clear display.' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        if (data.length > 0) {
          setProducts(data);
        } else {
          setProducts(dummyProducts); // fallback for demo
        }
      } catch (error) {
        console.error("Error fetching products", error);
        setProducts(dummyProducts); // fallback for demo
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === '' || p.category === categoryFilter)
  );

  return (
    <div className="product-list-container animate-fade-in">
      <div className="filters glass-panel">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-filter">
          <Filter size={20} className="filter-icon" />
          <select 
            className="input-field"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Audio">Audio</option>
            <option value="Wearables">Wearables</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : (
        <div className="grid-layout">
          {filteredProducts.map(product => (
            <div key={product._id} className="product-card glass-panel">
              <div className="product-image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h4>{product.name}</h4>
                <div className="product-footer">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  <Link to={`/product/${product._id}`} className="btn btn-primary btn-small">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
