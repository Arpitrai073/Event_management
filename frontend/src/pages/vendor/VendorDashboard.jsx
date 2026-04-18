import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import VendorItemsList from './VendorItemsList';
import AddProduct from './AddProduct';
import VendorTransactions from './VendorTransactions';

const VendorDashboardLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="bg-blue-600 p-6 flex flex-col h-full rounded border border-gray-400 min-h-[600px]">
      <div className="flex justify-center mb-8">
         <div className="bg-gray-300 px-32 py-4 rounded text-center border border-gray-400 font-bold">
            Welcome <br/> {user.name}
         </div>
      </div>
      
      <div className="flex justify-center gap-6 mt-16 mb-10">
        <Link to="/vendor/items" className="bg-gray-300 px-8 py-2 rounded text-sm text-black border border-gray-400 font-semibold shadow hover:bg-gray-200">Your Item</Link>
        <Link to="/vendor/add-item" className="bg-gray-300 px-8 py-2 rounded text-sm text-black border border-gray-400 font-semibold shadow hover:bg-gray-200">Add New Item</Link>
        <Link to="/vendor/transactions" className="bg-gray-300 px-8 py-2 rounded text-sm text-black border border-gray-400 font-semibold shadow hover:bg-gray-200">Transaction</Link>
        <button onClick={handleLogout} className="bg-gray-300 px-8 py-2 rounded text-sm text-black border border-gray-400 font-semibold shadow hover:bg-gray-200">LogOut</button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<div className="text-center text-white text-2xl mt-10">Select an option from the menu</div>} />
          <Route path="/items" element={<VendorItemsList />} />
          <Route path="/add-item" element={<AddProduct />} />
          <Route path="/transactions" element={<VendorTransactions />} />
        </Routes>
      </div>
    </div>
  );
};

export default VendorDashboardLayout;
