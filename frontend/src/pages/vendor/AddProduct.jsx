import API from '../../api';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post('/vendor/products', { name, price, imageUrl });
      alert('Product Added');
      navigate('/vendor');
    } catch (error) {
      alert('Failed to add product');
    }
  };

  return (
    <div className="bg-blue-600 p-6 flex flex-col items-center h-full rounded border border-gray-400">
       <div className="bg-gray-300 px-8 py-2 rounded text-center w-full max-w-2xl flex justify-between">
          <span>Welcome Vendor</span>
          <span>Add New Item</span>
       </div>
       
       <form onSubmit={handleAdd} className="bg-blue-500 mt-12 p-8 rounded shadow flex flex-col gap-4 w-96 border border-blue-400">
          <input 
            type="text" placeholder="Product Name" required
            className="bg-gray-300 text-black px-4 py-2 rounded"
            value={name} onChange={(e) => setName(e.target.value)}
          />
          <input 
            type="number" placeholder="Product Price" required
            className="bg-gray-300 text-black px-4 py-2 rounded"
            value={price} onChange={(e) => setPrice(e.target.value)}
          />
          <input 
            type="text" placeholder="Product Image URL" 
            className="bg-gray-300 text-black px-4 py-2 rounded"
            value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
          />
          <button type="submit" className="bg-white text-blue-600 font-bold py-2 rounded mt-4">
            Add The Product
          </button>
       </form>
    </div>
  );
};

export default AddProduct;
