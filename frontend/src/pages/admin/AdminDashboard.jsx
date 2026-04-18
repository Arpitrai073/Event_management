import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import MaintainUser from './MaintainUser';

const AdminDashboardLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="bg-gray-300 p-6 flex flex-col h-full rounded border border-gray-400">
      <div className="flex justify-between items-center mb-10">
        <Link to="/admin" className="bg-white px-6 py-2 border border-gray-400 rounded text-sm text-green-700">Home</Link>
        <button onClick={handleLogout} className="bg-white px-6 py-2 border border-green-400 rounded text-sm text-green-700">LogOut</button>
      </div>

      <Routes>
        <Route path="/" element={<MaintenanceMenu />} />
        <Route path="/maintain-user" element={<MaintainUser type="User" />} />
        <Route path="/maintain-vendor" element={<MaintainUser type="Vendor" />} />
      </Routes>
    </div>
  );
};

const MaintenanceMenu = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white px-32 py-3 rounded mb-12 text-green-700 border border-green-500">
        Welcome Admin
      </div>
      
      <div className="flex w-full justify-around max-w-2xl">
        <Link to="/admin/maintain-user" className="bg-white px-8 py-2 border border-green-500 rounded text-green-700">Maintain User</Link>
        <Link to="/admin/maintain-vendor" className="bg-white px-8 py-2 border border-green-500 rounded text-green-700">Maintain Vendor</Link>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
