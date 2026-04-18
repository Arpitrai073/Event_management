import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api';

const UserProductList = ({ addToCart }) => {
  const { vendorId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/user/products');
        // filter by vendor if provided
        const filtered = vendorId ? res.data.filter(p => p.vendor._id === vendorId) : res.data;
        setProducts(filtered);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [vendorId]);

  return (
    <div className="flex flex-col items-center w-full">
       <div className="bg-white w-full max-w-5xl p-6 rounded border border-gray-400">
          <div className="flex justify-between items-center mb-8">
             <button onClick={() => navigate('/user/vendors')} className="bg-white border border-gray-400 px-6 py-1 rounded">Back</button>
             <div className="bg-blue-600 text-white px-20 py-2 rounded">Products</div>
             <button onClick={() => navigate('/user/cart')} className="bg-blue-600 text-white px-6 py-1 rounded shadow">View Cart</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             {products.map(product => (
                <div key={product._id} className="bg-blue-600 text-white p-4 rounded-xl flex flex-col items-center shadow-lg border border-blue-400">
                   <h3 className="text-lg font-bold mb-4">{product.name}</h3>
                   <div className="bg-white rounded p-1 mb-4 h-24 w-full flex items-center justify-center">
                      <img src={product.imageUrl || 'https://via.placeholder.com/100'} className="h-full object-contain" />
                   </div>
                   <p className="text-sm font-bold mb-4">Price: Rs. {product.price}</p>
                   
                   <button 
                    onClick={() => addToCart(product)}
                    className="bg-white text-blue-800 px-6 py-1 rounded-lg font-bold mt-auto hover:bg-gray-100"
                   >
                    Add to Cart
                   </button>
                </div>
             ))}
          </div>
          {loading && <p className="text-center mt-10">Loading Products...</p>}
          {!loading && products.length === 0 && <p className="text-center mt-10">No products found for this vendor.</p>}
       </div>
    </div>
  );
};

export default UserProductList;
