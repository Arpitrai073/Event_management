import { useState, useEffect } from 'react';
import API from '../../api';

const UpdateEntityList = ({ entityType }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/admin/users');
        if (entityType === 'UserMembership' || entityType === 'VendorMembership') {
          const targetRole = entityType === 'UserMembership' ? 'User' : 'Vendor';
          setData(res.data.filter(u => u.role === targetRole && u.membership && u.membership.status === 'Active'));
        } else {
          setData(res.data.filter(u => u.role === entityType));
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [entityType]);

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setEditForm({ name: item.name, email: item.email, category: item.category || 'Catering' });
  };

  const handleUpdateUser = async (id) => {
    try {
      await API.put(`/admin/users/${id}`, editForm);
      setData(prev => prev.map(item => item._id === id ? { ...item, ...editForm } : item));
      setEditingId(null);
      alert(`${entityType} updated successfully!`);
    } catch (error) {
      alert("Update failed: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete this ${entityType}?`)) return;
    try {
      await API.delete(`/admin/users/${id}`);
      setData(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      alert("Deletion failed");
    }
  };

  const updateMembership = async (userId, duration) => {
    try {
      await API.put(`/admin/membership/${userId}`, { duration });
      alert("Membership Duration Extended!");
      window.location.reload();
    } catch (error) {
      alert("Membership update failed");
    }
  };

  return (
    <div className="flex flex-col items-center w-full mt-8">
      <div className="bg-white px-8 py-3 rounded mb-8 text-green-700 border border-green-500 font-bold w-full max-w-4xl text-center shadow">
        Update {(entityType === 'UserMembership' || entityType === 'VendorMembership') ? `Active ${entityType.replace('Membership', ' Memberships')}` : entityType + 's'}
      </div>

      <div className="w-full max-w-5xl overflow-x-auto shadow-xl">
        <table className="w-full bg-white border-collapse border border-gray-400">
          <thead className="bg-[#4caf50] text-white">
            <tr>
              <th className="border border-gray-400 p-3">Name</th>
              <th className="border border-gray-400 p-3">Email</th>
              {entityType === 'Vendor' && <th className="border border-gray-400 p-3">Category</th>}
              {(entityType === 'Vendor' || entityType === 'User' || entityType === 'UserMembership' || entityType === 'VendorMembership') && <th className="border border-gray-400 p-3">Status</th>}
              {(entityType === 'UserMembership' || entityType === 'VendorMembership') && <th className="border border-gray-400 p-3">Extend Duration</th>}
              {(entityType !== 'UserMembership' && entityType !== 'VendorMembership') && <th className="border border-gray-400 p-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item._id} className="text-center hover:bg-gray-50">
                
                {/* NAME */}
                <td className="border border-gray-400 p-2">
                  {editingId === item._id ? (
                    <input type="text" className="border px-2 py-1 w-full" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                  ) : item.name}
                </td>
                
                {/* EMAIL */}
                <td className="border border-gray-400 p-2">
                  {editingId === item._id ? (
                    <input type="email" className="border px-2 py-1 w-full" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} />
                  ) : item.email}
                </td>
                
                {/* CATEGORY */}
                {entityType === 'Vendor' && (
                  <td className="border border-gray-400 p-2">
                    {editingId === item._id ? (
                      <select className="border px-2 py-1 w-full" value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})}>
                        <option value="Catering">Catering</option>
                        <option value="Florist">Florist</option>
                        <option value="Decoration">Decoration</option>
                        <option value="Lighting">Lighting</option>
                      </select>
                    ) : item.category}
                  </td>
                )}

                {/* STATUS */}
                {(entityType === 'Vendor' || entityType === 'User' || entityType === 'UserMembership' || entityType === 'VendorMembership') && (
                  <td className="border border-gray-400 p-2 font-semibold">
                    {item.membership?.status || 'Inactive'}
                  </td>
                )}

                {/* EXTEND DURATION (MEMBERSHIP ONLY) */}
                {(entityType === 'UserMembership' || entityType === 'VendorMembership') && (
                  <td className="border border-gray-400 p-2">
                    <select 
                      className="border border-green-500 rounded px-2 py-1 cursor-pointer focus:outline-none"
                      onChange={(e) => updateMembership(item._id, parseInt(e.target.value))}
                      defaultValue=""
                    >
                      <option value="" disabled>Select to Extend</option>
                      <option value="6">6 Months</option>
                      <option value="12">1 Year</option>
                      <option value="24">2 Years</option>
                    </select>
                  </td>
                )}

                {/* ACTIONS (USER/VENDOR ONLY) */}
                {(entityType !== 'UserMembership' && entityType !== 'VendorMembership') && (
                  <td className="border border-gray-400 p-2">
                    {editingId === item._id ? (
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleUpdateUser(item._id)} className="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-green-700">Save</button>
                        <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-gray-600">Cancel</button>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEditClick(item)} className="bg-yellow-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-yellow-600">Edit</button>
                        <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-600">Delete</button>
                      </div>
                    )}
                  </td>
                )}

              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && !loading && <p className="text-center p-6 text-gray-500 italic bg-white border border-t-0 border-gray-400">No records found.</p>}
        {loading && <p className="text-center p-6 bg-white border border-t-0 border-gray-400">Loading...</p>}
      </div>
    </div>
  );
};

export default UpdateEntityList;
