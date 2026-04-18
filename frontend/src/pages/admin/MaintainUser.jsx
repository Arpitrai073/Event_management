import { useState, useEffect } from 'react';
import API from '../../api';

const MaintainUser = ({ type }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get('/admin/users');
        // filter by role
        setUsers(res.data.filter(u => u.role === type));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [type]);

  const updateMembership = async (userId, duration) => {
    try {
      await API.put(`/admin/membership/${userId}`, { duration });
      alert("Membership Updated");
      window.location.reload();
    } catch (error) {
      alert("Update failed");
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-blue-300 text-center py-2 mb-8 w-full border border-blue-400 font-bold">
        Maintain {type}
      </div>

      <div className="w-full max-w-5xl overflow-x-auto">
        <table className="w-full bg-white border-collapse border border-gray-400">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border border-gray-400 p-2">Name</th>
              <th className="border border-gray-400 p-2">Email</th>
              {type === 'Vendor' && <th className="border border-gray-400 p-2">Category</th>}
              <th className="border border-gray-400 p-2">Status</th>
              {type === 'Vendor' && <th className="border border-gray-400 p-2">Update Membership</th>}
              <th className="border border-gray-400 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="text-center">
                <td className="border border-gray-400 p-2">{user.name}</td>
                <td className="border border-gray-400 p-2">{user.email}</td>
                {type === 'Vendor' && <td className="border border-gray-400 p-2 font-semibold">{user.category}</td>}
                <td className="border border-gray-400 p-2">
                   {type === 'Vendor' ? (user.membership?.status || 'Inactive') : 'Active'}
                </td>
                {type === 'Vendor' && (
                  <td className="border border-gray-400 p-2">
                    <select 
                      className="border rounded px-2"
                      onChange={(e) => updateMembership(user._id, parseInt(e.target.value))}
                      defaultValue=""
                    >
                      <option value="" disabled>Extend</option>
                      <option value="6">6 Months</option>
                      <option value="12">1 Year</option>
                      <option value="24">2 Years</option>
                    </select>
                  </td>
                )}
                <td className="border border-gray-400 p-2 text-red-600 cursor-pointer font-bold">Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p className="text-center mt-4">Loading...</p>}
      </div>
    </div>
  );
};

export default MaintainUser;
