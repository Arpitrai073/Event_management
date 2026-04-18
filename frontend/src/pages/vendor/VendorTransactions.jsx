import { useState, useEffect } from 'react';
import API from '../../api';

const VendorTransactions = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/vendor/requests');
        setOrders(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId) => {
    try {
      await API.put(`/vendor/order-status/${orderId}`, { status: newStatus });
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      setUpdatingId(null);
      alert("Status Updated Successfully");
    } catch (error) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="flex flex-col items-center mt-6 w-full px-4">
      <div className="bg-blue-300 text-blue-900 border border-blue-400 w-full text-center py-2 mb-8 font-bold rounded shadow">
         Transactions / Product Status
      </div>

      <div className="bg-gray-300 p-4 rounded border border-gray-400 w-full max-w-6xl shadow-xl">
         <div className="grid grid-cols-6 bg-blue-600 text-white font-bold p-2 mb-2 rounded shadow">
            <div>User Name</div>
            <div>User Email</div>
            <div>Address</div>
            <div>Status</div>
            <div>Update</div>
            <div>Action</div>
         </div>

         <div className="space-y-2">
            {orders.map(order => (
               <div key={order._id} className="grid grid-cols-6 items-center bg-white p-2 rounded border border-gray-300 shadow-sm text-center text-sm">
                  <div className="font-semibold">{order.user?.name || 'Guest'}</div>
                  <div className="truncate px-1">{order.user?.email || 'N/A'}</div>
                  <div className="truncate px-1">{order.shippingAddress?.city}, {order.shippingAddress?.state}</div>
                  <div className="font-bold text-blue-700">{order.status}</div>
                  
                  <div>
                     <button 
                        onClick={() => setUpdatingId(order._id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                     >
                        Set Status
                     </button>
                  </div>

                  <div>
                     <button className="bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                  </div>

                  {updatingId === order._id && (
                     <div className="col-span-6 bg-blue-500 mt-2 p-4 rounded border border-blue-600 text-white flex items-center justify-center gap-6 shadow-inner relative">
                        <span className="font-bold uppercase text-xs absolute top-1 left-2 underline">Update Status Logic:</span>
                        <label className="flex items-center gap-1 cursor-pointer hover:bg-blue-400 px-2 rounded">
                           <input type="radio" value="Received" name="status" onChange={(e) => setNewStatus(e.target.value)} />
                           <span>Received</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer hover:bg-blue-400 px-2 rounded">
                           <input type="radio" value="Ready for Shipping" name="status" onChange={(e) => setNewStatus(e.target.value)} />
                           <span>Ready for Shipping</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer hover:bg-blue-400 px-2 rounded">
                           <input type="radio" value="Out for Delivery" name="status" onChange={(e) => setNewStatus(e.target.value)} />
                           <span>Out for Delivery</span>
                        </label>
                        <button 
                           onClick={() => handleUpdateStatus(order._id)}
                           className="bg-white text-blue-800 px-4 py-1 rounded font-bold shadow hover:bg-gray-100"
                        >
                           Confirm
                        </button>
                        <button onClick={() => setUpdatingId(null)} className="text-white underline text-xs">Cancel</button>
                     </div>
                  )}
               </div>
            ))}
            {orders.length === 0 && !loading && (
               <p className="text-center py-10 text-gray-600 italic">No transactions found for your items yet.</p>
            )}
         </div>
      </div>
      {loading && <p className="text-white mt-10">Loading Transactions...</p>}
    </div>
  );
};

export default VendorTransactions;
