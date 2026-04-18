import { useState, useEffect } from 'react';
import API from '../../api';

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchGuests = async () => {
    try {
      const res = await API.get('/user/guests');
      setGuests(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/user/guest/${editingId}`, formData);
      } else {
        await API.post('/user/guest', formData);
      }
      setFormData({ name: '', email: '', phone: '' });
      setEditingId(null);
      fetchGuests();
    } catch (error) {
      alert("Error saving guest");
    }
  };

  const handleEdit = (guest) => {
    setFormData({ name: guest.name, email: guest.email || '', phone: guest.phone || '' });
    setEditingId(guest._id);
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this guest?")) return;
    try {
      await API.delete(`/user/guest/${id}`);
      fetchGuests();
    } catch (error) {
      alert("Error deleting guest");
    }
  };

  return (
    <div className="flex flex-col items-center mt-6 w-full px-4">
      <div className="bg-blue-300 text-blue-900 border border-blue-400 w-full text-center py-2 mb-8 font-bold rounded shadow grid place-items-center">
         <span>Manage Guest List</span>
      </div>

      <div className="bg-gray-300 p-6 rounded border border-gray-400 w-full max-w-5xl shadow-xl flex gap-8 flex-col md:flex-row items-start">
         
         {/* Form Area */}
         <div className="md:w-1/3 bg-white p-4 rounded shadow border border-gray-400 w-full">
            <h3 className="font-bold text-blue-800 mb-4 text-center">{editingId ? 'Edit Guest' : 'Add New Guest'}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
               <input 
                 type="text" placeholder="Name" required 
                 className="bg-blue-100 border border-blue-300 px-3 py-2 rounded text-sm outline-none"
                 value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
               />
               <input 
                 type="email" placeholder="Email (optional)" 
                 className="bg-blue-100 border border-blue-300 px-3 py-2 rounded text-sm outline-none"
                 value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} 
               />
               <input 
                 type="tel" placeholder="Phone Number (optional)" 
                 className="bg-blue-100 border border-blue-300 px-3 py-2 rounded text-sm outline-none"
                 value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} 
               />
               <div className="flex gap-2">
                 <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-2 rounded shadow hover:bg-blue-700">
                   {editingId ? 'Update View' : 'Add Guest'}
                 </button>
                 {editingId && (
                    <button type="button" onClick={() => {setEditingId(null); setFormData({name:'', email:'', phone:''});}} className="flex-1 bg-gray-500 text-white font-bold py-2 rounded shadow hover:bg-gray-600">
                      Cancel
                    </button>
                 )}
               </div>
            </form>
         </div>

         {/* List Area */}
         <div className="md:w-2/3 w-full">
            <div className="grid grid-cols-4 bg-blue-600 text-white font-bold p-2 mb-2 rounded shadow text-center text-sm border border-blue-800">
               <div>Name</div>
               <div>Email</div>
               <div>Phone</div>
               <div>Action</div>
            </div>
            
            <div className="space-y-2">
               {guests.map(guest => (
                  <div key={guest._id} className="grid grid-cols-4 items-center bg-white p-2 rounded border border-gray-300 shadow-sm text-center text-sm">
                     <div className="font-semibold px-1 truncate">{guest.name}</div>
                     <div className="px-1 truncate">{guest.email || 'N/A'}</div>
                     <div className="px-1 truncate">{guest.phone || 'N/A'}</div>
                     <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(guest)} className="bg-yellow-500 text-white px-3 py-1 rounded text-xs hover:bg-yellow-600 shadow font-bold">Edit</button>
                        <button onClick={() => handleDelete(guest._id)} className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 shadow font-bold">Delete</button>
                     </div>
                  </div>
               ))}
               {guests.length === 0 && !loading && (
                  <p className="text-center py-10 text-gray-600 italic bg-white rounded border border-gray-300">Your guest list is currently empty.</p>
               )}
               {loading && <p className="text-center py-10 text-gray-600 italic bg-white rounded border border-gray-300">Loading guests...</p>}
            </div>
         </div>
      </div>
    </div>
  );
};

export default GuestList;
