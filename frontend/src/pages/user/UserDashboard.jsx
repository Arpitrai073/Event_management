import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import UserVendorList from './UserVendorList';
import UserProductList from './UserProductList';
import CartView from './CartView';
import UserOrderStatus from './UserOrderStatus';
import GuestList from './GuestList';

const UserDashboardLayout = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const updateQuantity = (id, q) => {
    setCart(prev => prev.map(item => item._id === id ? { ...item, quantity: q } : item));
  };

  const [showVendorMenu, setShowVendorMenu] = useState(false);

  return (
    <div className="bg-gray-300 p-6 flex flex-col h-full rounded border border-gray-400 items-center min-h-[600px]">
      <div className="bg-blue-600 text-white w-full max-w-4xl text-center py-2 mb-12 rounded shadow font-bold">
         WELCOME USER
      </div>
      
      <div className="flex justify-center gap-8 mb-12 w-full max-w-4xl text-center">
        <div className="relative">
          <button 
            onClick={() => setShowVendorMenu(!showVendorMenu)}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm shadow hover:bg-blue-700 flex items-center justify-between w-32"
          >
            Vendor <span>▼</span>
          </button>
          
          {showVendorMenu && (
            <div className="absolute top-full mt-2 left-0 w-32 bg-blue-300 rounded shadow-lg flex flex-col text-sm text-black font-semibold border border-blue-400 z-50 text-left">
              <Link to="/user/vendors" onClick={() => setShowVendorMenu(false)} className="px-3 py-2 hover:bg-blue-400 border-b border-blue-400">All</Link>
              <Link to="/user/vendors?category=Catering" onClick={() => setShowVendorMenu(false)} className="px-3 py-2 hover:bg-blue-400">Catering</Link>
              <Link to="/user/vendors?category=Florist" onClick={() => setShowVendorMenu(false)} className="px-3 py-2 hover:bg-blue-400">Florist</Link>
              <Link to="/user/vendors?category=Decoration" onClick={() => setShowVendorMenu(false)} className="px-3 py-2 hover:bg-blue-400">Decoration</Link>
              <Link to="/user/vendors?category=Lighting" onClick={() => setShowVendorMenu(false)} className="px-3 py-2 hover:bg-blue-400">Lighting</Link>
            </div>
          )}
        </div>

        <Link to="/user/cart" className="bg-blue-600 text-white px-8 py-2 rounded text-sm shadow hover:bg-blue-700">
          Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
        </Link>
        <Link to="/user/guest-list" className="bg-blue-600 text-white px-8 py-2 rounded text-sm shadow hover:bg-blue-700">Guest List</Link>
        <Link to="/user/order-status" className="bg-blue-600 text-white px-8 py-2 rounded text-sm shadow hover:bg-blue-700">Order Status</Link>
      </div>

      <div className="w-full flex-1">
        <Routes>
          <Route path="/" element={<div className="text-center text-gray-600 text-xl font-bold mt-20">Select a category to start shopping</div>} />
          <Route path="/vendors" element={<UserVendorList />} />
          <Route path="/products/:vendorId" element={<UserProductList addToCart={addToCart} />} />
          <Route path="/cart" element={<CartView cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} setCart={setCart} />} />
          <Route path="/order-status" element={<UserOrderStatus />} />
          <Route path="/guest-list" element={<GuestList />} />
        </Routes>
      </div>
      
      <button onClick={handleLogout} className="bg-blue-600 text-white px-10 py-2 rounded mt-8 shadow-lg hover:bg-blue-700">
        LogOut
      </button>
    </div>
  );
};

export default UserDashboardLayout;
