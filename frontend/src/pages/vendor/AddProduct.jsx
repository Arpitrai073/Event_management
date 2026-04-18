import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [products, setProducts] = useState([]);
  
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', imageUrl: '' });
  
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await API.get('/vendor/products');
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post('/vendor/products', { name, price, imageUrl });
      alert('Product Added');
      setName('');
      setPrice('');
      setImageUrl('');
      fetchProducts();
    } catch (error) {
      alert('Failed to add product');
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/vendor/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleUpdateClick = (product) => {
    if (editingId === product._id) {
      updateProduct(product._id);
    } else {
      setEditingId(product._id);
      setEditForm({ name: product.name, price: product.price, imageUrl: product.imageUrl });
    }
  };

  const updateProduct = async (id) => {
    try {
      const res = await API.put(`/vendor/products/${id}`, editForm);
      setProducts(products.map(p => p._id === id ? res.data : p));
      setEditingId(null);
    } catch (error) {
      alert("Update failed");
    }
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="flex flex-col gap-6 font-sans">
      
      {/* Wireframe Mock Top Navigation Layer just for this screen */}
      <div className="bg-[#4d79c7] flex justify-between items-center px-8 py-4 border border-[#3b5998]">
        <div className="text-white text-xl">
          Welcome '{user.name || 'Vendor Name'}'
        </div>
        <div className="flex gap-4">
          <button 
             onClick={() => navigate('/vendor/transactions')} 
             className="bg-white px-4 py-2 text-black font-semibold rounded border border-green-500 shadow-sm hover:bg-gray-100"
          >
             Product Status
          </button>
          <button 
             onClick={() => navigate('/vendor/requested-items')} 
             className="bg-white px-4 py-2 text-black font-semibold rounded border border-green-500 shadow-sm hover:bg-gray-100"
          >
             Request Item
          </button>
          <button 
             onClick={() => navigate('/vendor/items')} 
             className="bg-white px-4 py-2 text-black font-semibold rounded border border-green-500 shadow-sm hover:bg-gray-100"
          >
             View Product
          </button>
          <button 
             className="bg-white px-4 py-2 text-black font-semibold rounded border border-green-500 shadow-sm hover:bg-gray-100" 
             onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href='/';
             }}
          >
             Log Out
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        
        {/* LEFT PANE: Add Product Form */}
        <div className="w-1/3 bg-[#4d79c7] p-8 border border-[#3b5998] flex flex-col items-center min-h-[400px]">
           <form onSubmit={handleAdd} className="w-full flex flex-col gap-6 mt-8">
              <input 
                type="text" placeholder="Product Name" required
                className="bg-[#cccccc] text-black px-4 py-3 text-center border font-semibold border-gray-400 focus:outline-none"
                value={name} onChange={(e) => setName(e.target.value)}
              />
              <input 
                type="number" placeholder="Product Price" required
                className="bg-[#cccccc] text-black px-4 py-3 text-center border font-semibold border-gray-400 focus:outline-none"
                value={price} onChange={(e) => setPrice(e.target.value)}
              />
              <input 
                type="text" placeholder="Product Image" 
                className="bg-[#cccccc] text-black px-4 py-3 text-center border font-semibold border-gray-400 focus:outline-none"
                value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
              />
              
              <div className="mt-8 flex justify-center">
                <button type="submit" className="bg-white text-black font-semibold px-8 py-2 border border-gray-300 shadow">
                  Add The Product
                </button>
              </div>
           </form>
        </div>

        {/* RIGHT PANE: Product List */}
        <div className="w-2/3 flex flex-col gap-6 pl-4">
           {/* Headers */}
           <div className="grid grid-cols-4 gap-4 items-center pl-2">
              <div className="bg-[#4d79c7] text-white text-center py-4 px-2 border border-[#3b5998]">Product Image</div>
              <div className="bg-[#4d79c7] text-white text-center py-4 px-2 border border-[#3b5998]">Product Name</div>
              <div className="bg-[#4d79c7] text-white text-center py-4 px-2 border border-[#3b5998]">Product Price</div>
              <div className="bg-[#4d79c7] text-white text-center py-4 px-2 border border-[#3b5998]">Action</div>
           </div>

           {/* Rows */}
           <div className="flex flex-col gap-4">
              {products.map(product => (
                <div key={product._id} className="grid grid-cols-4 gap-4 items-center">
                   
                   {/* IMAGE COLUMN */}
                   <div className="bg-[#4d79c7] text-white h-32 flex flex-col items-center justify-center p-2 border border-[#3b5998]">
                      {editingId === product._id ? (
                        <input type="text" value={editForm.imageUrl} onChange={(e) => setEditForm({...editForm, imageUrl: e.target.value})} className="text-black w-full text-xs p-1"/>
                      ) : (
                        product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="h-full object-contain bg-white w-full" /> : <span>Image</span>
                      )}
                   </div>

                   {/* NAME COLUMN */}
                   <div className="bg-[#4d79c7] text-white text-center py-4 px-2 border border-[#3b5998]">
                      {editingId === product._id ? (
                         <input type="text" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="text-black w-full px-1 text-center"/>
                      ) : product.name}
                   </div>

                   {/* PRICE COLUMN */}
                   <div className="bg-[#4d79c7] text-white text-center py-4 px-2 border border-[#3b5998]">
                      {editingId === product._id ? (
                         <input type="number" value={editForm.price} onChange={(e) => setEditForm({...editForm, price: e.target.value})} className="text-black w-[80%] px-1 text-center"/>
                      ) : `Rs/- ${product.price}`}
                   </div>

                   {/* ACTIONS COLUMN */}
                   <div className="flex flex-col gap-1 items-center">
                      <button onClick={() => deleteProduct(product._id)} className="w-full bg-[#4d79c7] text-white py-3 border border-[#3b5998] hover:bg-red-600 transition-colors">
                        Delete
                      </button>
                      <button onClick={() => handleUpdateClick(product)} className={`w-full py-3 border border-[#3b5998] text-white overflow-hidden ${editingId === product._id ? 'bg-green-600' : 'bg-[#4d79c7]'}`}>
                        {editingId === product._id ? 'Save' : 'Update'}
                      </button>
                   </div>
                </div>
              ))}
              
              {products.length === 0 && <div className="text-center mt-10">No products found. Add one on the left.</div>}
           </div>
        </div>

      </div>
    </div>
  );
};

export default AddProduct;
