import { useState, useEffect } from 'react';
import API from '../../api';

const VendorRequestItem = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Extract only the items belonging to this vendor from the orders
  const orderedItemsList = [];
  orders.forEach(order => {
     order.items?.forEach(cartItem => {
        if (cartItem.product && cartItem.product.name) {
           orderedItemsList.push({
              name: cartItem.product.name,
              imageUrl: cartItem.product.imageUrl,
              quantity: cartItem.quantity,
              userName: order.user?.name || 'Guest',
              userEmail: order.user?.email || 'N/A'
           });
        }
     });
  });

  return (
    <div className="bg-[#c4c4c4] min-h-[500px] w-full p-8 font-sans">
      
      {/* Top Navigation Bar mimicking the wireframe */}
      <div className="flex justify-between items-center mb-16">
        <button 
           className="bg-[#4d79c7] text-white px-8 py-3 w-40 text-center shadow"
           onClick={() => window.location.href='/vendor'}
        >
          Home
        </button>
        
        <div className="bg-[#4d79c7] text-white px-8 py-3 w-96 text-center shadow text-lg font-semibold cursor-pointer">
          Request Item
        </div>
        
        <button 
           className="bg-[#4d79c7] text-white px-8 py-3 w-40 text-center shadow"
           onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href='/';
           }}
        >
          LogOut
        </button>
      </div>

      {/* Grid of Ordered Items */}
      {loading ? (
         <div className="text-center mt-20">Loading orders...</div>
      ) : (
         <div className="flex flex-wrap justify-center gap-10 px-4">
            {orderedItemsList.length > 0 ? (
               orderedItemsList.map((item, index) => (
                 <div key={index} className="bg-[#4d79c7] text-white w-64 h-auto min-h-[320px] flex flex-col shadow-lg border border-[#3b5998] p-4 text-center">
                    
                    {/* Item Image */}
                    <div className="bg-white w-full h-32 mb-4 border border-gray-300 flex items-center justify-center p-1">
                       {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="h-full object-contain" /> : <span className="text-black">No Image</span>}
                    </div>

                    {/* Item Details */}
                    <h2 className="text-xl font-bold mb-2 break-words leading-tight">{item.name}</h2>
                    <p className="text-sm border-t border-blue-400 my-2 pt-2"><span className="font-semibold">Qty:</span> {item.quantity}</p>
                    
                    {/* Buyer Details */}
                    <div className="mt-auto bg-blue-800 p-2 rounded text-xs text-left">
                       <p className="truncate"><span className="font-semibold text-blue-300">Buyer:</span> {item.userName}</p>
                       <p className="truncate"><span className="font-semibold text-blue-300">Email:</span> {item.userEmail}</p>
                    </div>

                 </div>
               ))
            ) : (
               <div className="text-center text-gray-700 italic mt-10">
                 No items requested currently.
               </div>
            )}
         </div>
      )}
      
    </div>
  );
};

export default VendorRequestItem;
