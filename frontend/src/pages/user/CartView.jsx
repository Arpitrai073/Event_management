import { useState } from 'react';
import API from '../../api';

const CartView = ({ cart, removeFromCart, updateQuantity, setCart }) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: '', email: '', number: '', address: '', state: '', city: '', pinCode: '', paymentMethod: 'Cash'
  });

  const grandTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const orderItems = cart.map(item => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price
      }));

      await API.post('/user/order', {
        items: orderItems,
        totalAmount: grandTotal,
        paymentMethod: checkoutData.paymentMethod,
        shippingAddress: checkoutData
      });

      alert("THANK YOU! Order Placed Successfully.");
      setCart([]);
      setCheckingOut(false);
    } catch (error) {
      alert("Checkout failed");
    }
  };

  if (checkingOut) {
    return (
      <div className="flex flex-col items-center w-full">
         <div className="bg-gray-400 p-8 rounded border border-gray-600 w-full max-w-2xl shadow-2xl">
            <h2 className="text-center font-bold mb-6">CheckOut Details</h2>
            <div className="bg-blue-600 text-white text-center py-2 mb-8 rounded font-bold">
               Grand Total: Rs. {grandTotal} /-
            </div>

            <form onSubmit={handleCheckout} className="grid grid-cols-2 gap-4">
               <input placeholder="Name" className="bg-blue-300 p-2 rounded border border-blue-400" value={checkoutData.name} onChange={e => setCheckoutData({...checkoutData, name: e.target.value})} required/>
               <input placeholder="Number" className="bg-blue-300 p-2 rounded border border-blue-400" value={checkoutData.number} onChange={e => setCheckoutData({...checkoutData, number: e.target.value})} required/>
               <input placeholder="E-mail" className="bg-blue-300 p-2 rounded border border-blue-400" value={checkoutData.email} onChange={e => setCheckoutData({...checkoutData, email: e.target.value})} required/>
               <select className="bg-blue-300 p-2 rounded border border-blue-400" value={checkoutData.paymentMethod} onChange={e => setCheckoutData({...checkoutData, paymentMethod: e.target.value})}>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
               </select>
               <input placeholder="Address" className="bg-blue-300 p-2 rounded border border-blue-400 col-span-2" value={checkoutData.address} onChange={e => setCheckoutData({...checkoutData, address: e.target.value})} required/>
               <input placeholder="City" className="bg-blue-300 p-2 rounded border border-blue-400" value={checkoutData.city} onChange={e => setCheckoutData({...checkoutData, city: e.target.value})} required/>
               <input placeholder="State" className="bg-blue-300 p-2 rounded border border-blue-400" value={checkoutData.state} onChange={e => setCheckoutData({...checkoutData, state: e.target.value})} required/>
               <input placeholder="Pin Code" className="bg-blue-300 p-2 rounded border border-blue-400" value={checkoutData.pinCode} onChange={e => setCheckoutData({...checkoutData, pinCode: e.target.value})} required/>
               
               <div className="col-span-2 flex justify-center mt-6 gap-4">
                  <button type="button" onClick={() => setCheckingOut(false)} className="bg-gray-600 text-white px-8 py-2 rounded">Back</button>
                  <button type="submit" className="bg-blue-600 text-white px-12 py-2 rounded font-bold shadow-lg">Order Now</button>
               </div>
            </form>
         </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
       <div className="bg-gray-400 p-4 rounded border border-gray-600 w-full max-w-5xl shadow-xl">
          <div className="bg-blue-300 text-blue-800 text-center py-2 mb-6 font-bold text-xl border border-blue-400">
             Shopping Cart
          </div>

          <div className="bg-blue-600 text-white grid grid-cols-6 text-center font-bold p-2 mb-2 rounded">
             <div>Image</div>
             <div>Name</div>
             <div>Price</div>
             <div>Quantity</div>
             <div>Total Price</div>
             <div>Action</div>
          </div>

          <div className="space-y-2 mb-6">
             {cart.map(item => (
                <div key={item._id} className="bg-white grid grid-cols-6 items-center text-center p-2 rounded border border-gray-300 shadow-sm">
                   <div className="h-12 flex justify-center">
                      <img src={item.imageUrl || 'https://via.placeholder.com/50'} className="h-full object-contain" />
                   </div>
                   <div className="text-sm font-bold">{item.name}</div>
                   <div>{item.price}/-</div>
                   <div>
                      <select 
                        className="bg-blue-100 border border-blue-400 rounded px-1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                      >
                         {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                   </div>
                   <div className="font-bold">{item.price * item.quantity}/-</div>
                   <div>
                      <button 
                        onClick={() => removeFromCart(item._id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                      >
                        Remove
                      </button>
                   </div>
                </div>
             ))}
             {cart.length === 0 && <p className="text-center py-10 text-gray-700 italic">Your cart is empty</p>}
          </div>

          <div className="bg-blue-600 text-white flex justify-between items-center p-3 rounded font-bold">
             <span>Grand Total</span>
             <span>{grandTotal}/-</span>
             <button onClick={() => setCart([])} className="bg-white text-blue-800 px-4 py-1 rounded text-sm">Delete All</button>
          </div>

          {cart.length > 0 && (
            <div className="flex justify-center mt-8">
               <button 
                onClick={() => setCheckingOut(true)}
                className="bg-white text-blue-800 px-12 py-2 rounded-lg font-bold border-2 border-green-600 shadow hover:bg-green-50"
               >
                Proceed to CheckOut
               </button>
            </div>
          )}
       </div>
    </div>
  );
};

export default CartView;
