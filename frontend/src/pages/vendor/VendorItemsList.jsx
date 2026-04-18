import { useState, useEffect } from 'react';
import API from '../../api';

const VendorItemsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/vendor/products');
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/vendor/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {products.map(product => (
          <div key={product._id} className="bg-gray-300 p-4 rounded border border-gray-400 flex flex-col items-center shadow">
            <div className="bg-blue-600 w-full text-center py-2 text-white mb-4 rounded">
              {product.name}
            </div>
            
            <div className="bg-white w-full h-32 flex items-center justify-center mb-4 border border-gray-400">
               {product.imageUrl ? <img src={product.imageUrl} className="h-full object-contain" /> : "No Image"}
            </div>

            <div className="bg-blue-200 w-full text-center py-1 mb-4 border border-blue-400 font-bold">
               Rs. {product.price} /-
            </div>

            <div className="flex w-full gap-2">
               <button onClick={() => deleteProduct(product._id)} className="flex-1 bg-blue-600 text-white py-1 rounded text-sm hover:bg-red-600">Delete</button>
               <button className="flex-1 bg-blue-600 text-white py-1 rounded text-sm">Update</button>
            </div>
          </div>
        ))}
      </div>
      {loading && <p className="text-white mt-10">Loading Your Items...</p>}
      {!loading && products.length === 0 && <p className="text-white mt-10">No items found. Go to "Add New Item".</p>}
    </div>
  );
};

export default VendorItemsList;
