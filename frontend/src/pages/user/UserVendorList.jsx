import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';

const UserVendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await API.get('/user/vendors');
        setVendors(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  // Filter vendors by one of the categories for a specific view if needed
  // For now let's just group them or show all
  const categories = ['Catering', 'Florist', 'Decoration', 'Lighting'];

  return (
    <div className="flex flex-col items-center w-full">
       <div className="bg-white w-full max-w-5xl p-6 rounded border border-gray-400">
          <div className="flex justify-between items-center mb-8">
             <button onClick={() => navigate('/user')} className="bg-white border border-gray-400 px-6 py-1 rounded">Home</button>
             <div className="bg-blue-600 text-white px-20 py-2 rounded">Vendor</div>
             <button onClick={() => navigate('/')} className="bg-white border border-gray-400 px-6 py-1 rounded">Logout</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {vendors.map(vendor => (
                <div key={vendor._id} className="bg-blue-600 text-white p-4 rounded-xl flex flex-col items-center min-h-[200px] shadow-lg">
                   <h3 className="text-lg font-bold mb-2">{vendor.name}</h3>
                   <p className="text-xs mb-6 text-center">Contact: {vendor.email}</p>
                   <p className="text-sm font-semibold mb-4 bg-white text-blue-800 px-2 rounded">{vendor.category}</p>
                   
                   <button 
                    onClick={() => navigate(`/user/products/${vendor._id}`)}
                    className="bg-white text-blue-800 px-4 py-1 rounded-lg font-bold mt-auto hover:bg-gray-100"
                   >
                    Shop Item
                   </button>
                </div>
             ))}
          </div>
          {loading && <p className="text-center mt-10">Loading Vendors...</p>}
       </div>
    </div>
  );
};

export default UserVendorList;
