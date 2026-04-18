import { useState, useEffect } from 'react';
import API from '../../api';

const UserOrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await API.get('/user/orders');
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center mt-6 w-full px-4">
      <div className="bg-blue-300 text-blue-900 border border-blue-400 w-full text-center py-2 mb-8 font-bold rounded shadow">
         User Order Status
      </div>

      <div className="bg-gray-300 p-4 rounded border border-gray-400 w-full max-w-6xl shadow-xl">
         <div className="grid grid-cols-4 bg-blue-600 text-white font-bold p-2 mb-2 rounded shadow text-center">
            <div>Name</div>
            <div>E-mail</div>
            <div>Address</div>
            <div>Status</div>
         </div>

         <div className="space-y-2">
            {orders.map(order => (
               <div key={order._id} className="grid grid-cols-4 items-center bg-white p-2 rounded border border-gray-300 shadow-sm text-center text-sm">
                  <div className="font-semibold">{order.shippingAddress?.name || order.user?.name || 'User'}</div>
                  <div className="truncate px-1">{order.shippingAddress?.email || order.user?.email || 'N/A'}</div>
                  <div className="truncate px-1">{order.shippingAddress?.address}, {order.shippingAddress?.city}</div>
                  <div className="font-bold text-blue-700">{order.status}</div>
               </div>
            ))}
            {orders.length === 0 && !loading && (
               <p className="text-center py-10 text-gray-600 italic">No orders found. Start shopping to see your status here!</p>
            )}
         </div>
      </div>
      {loading && <p className="text-gray-600 mt-10 italic">Loading your orders...</p>}
    </div>
  );
};

export default UserOrderStatus;
