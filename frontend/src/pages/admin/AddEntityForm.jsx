import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';

const AddEntityForm = ({ entityType }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', role: entityType === 'User' ? 'User' : 'Vendor', category: 'Catering', vendorId: '', duration: 6 });
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If we are adding a membership, fetch entities without memberships
    if (entityType === 'UserMembership' || entityType === 'VendorMembership') {
      const targetRole = entityType === 'UserMembership' ? 'User' : 'Vendor';
      const fetchEntities = async () => {
        try {
          const res = await API.get('/admin/users');
          // filter to matching role that don't have an active membership
          const entityList = res.data.filter(u => u.role === targetRole && (!u.membership || u.membership.status !== 'Active'));
          setVendors(entityList);
          if(entityList.length > 0) {
            setFormData(prev => ({ ...prev, vendorId: entityList[0]._id }));
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchEntities();
    }
  }, [entityType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (entityType === 'UserMembership' || entityType === 'VendorMembership') {
        if(!formData.vendorId) {
            alert("No user/vendor selected!");
            return setLoading(false);
        }
        await API.put(`/admin/membership/${formData.vendorId}`, { duration: formData.duration });
        alert("Membership Added Successfully!");
      } else {
        await API.post('/admin/users', {
          name: formData.name,
          email: formData.email,
          role: entityType,
          category: entityType === 'Vendor' ? formData.category : undefined
        });
        alert(`${entityType} Added Successfully! Default password is password123`);
      }
      navigate('/admin');
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mt-8">
      <div className="bg-white px-8 py-3 rounded mb-8 text-green-700 border border-green-500 font-bold w-full text-center shadow">
        Add New {entityType.replace('Membership', ' Membership')}
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 border border-gray-400 rounded w-full flex flex-col gap-6 shadow-xl">
        
        {/* ADD USER OR VENDOR */}
        {(entityType === 'User' || entityType === 'Vendor') && (
          <>
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold mb-1">Name</label>
              <input 
                type="text" required
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                className="border border-green-400 p-2 rounded focus:outline-none focus:ring-1 focus:ring-green-600"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold mb-1">Email</label>
              <input 
                type="email" required
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                className="border border-green-400 p-2 rounded focus:outline-none focus:ring-1 focus:ring-green-600"
              />
            </div>
          </>
        )}

        {/* EXTRA FIELD FOR VENDOR */}
        {entityType === 'Vendor' && (
          <div className="flex flex-col">
            <label className="text-gray-600 font-semibold mb-1">Category</label>
            <select 
              value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
              className="border border-green-400 p-2 rounded focus:outline-none focus:ring-1 focus:ring-green-600 bg-white"
            >
              <option value="Catering">Catering</option>
              <option value="Florist">Florist</option>
              <option value="Decoration">Decoration</option>
              <option value="Lighting">Lighting</option>
            </select>
          </div>
        )}

        {/* FIELDS FOR MEMBERSHIP ADD */}
        {(entityType === 'UserMembership' || entityType === 'VendorMembership') && (
          <>
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold mb-1">Target {entityType.replace('Membership', '')}</label>
              {vendors.length === 0 ? (
                 <p className="text-sm text-red-600 font-semibold bg-red-50 p-2 rounded">No eligible inactive {entityType.replace('Membership', 's').toLowerCase()} found.</p>
              ) : (
                 <select 
                   value={formData.vendorId} onChange={e => setFormData({...formData, vendorId: e.target.value})}
                   className="border border-green-400 p-2 rounded focus:outline-none focus:ring-1 focus:ring-green-600 bg-white"
                 >
                   {vendors.map(v => (
                     <option key={v._id} value={v._id}>{v.name} ({v.email})</option>
                   ))}
                 </select>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold mb-1">Duration</label>
              <select 
                value={formData.duration} onChange={e => setFormData({...formData, duration: parseInt(e.target.value)})}
                className="border border-green-400 p-2 rounded focus:outline-none focus:ring-1 focus:ring-green-600 bg-white"
              >
                <option value={6}>6 Months</option>
                <option value={12}>1 Year</option>
                <option value={24}>2 Years</option>
              </select>
            </div>
          </>
        )}

        <button 
          type="submit" 
          disabled={loading || ((entityType === 'UserMembership' || entityType === 'VendorMembership') && vendors.length === 0)}
          className="mt-4 bg-green-600 text-white font-bold py-3 rounded shadow hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : `Confirm Add`}
        </button>
      </form>
    </div>
  );
};

export default AddEntityForm;
