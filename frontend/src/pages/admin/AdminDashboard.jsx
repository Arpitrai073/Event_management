import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AddEntityForm from './AddEntityForm';
import UpdateEntityList from './UpdateEntityList';

const AdminDashboardLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="bg-gray-300 p-8 flex flex-col h-full rounded border border-gray-400 items-center min-h-[600px]">
      <div className="flex justify-between items-center w-full max-w-4xl mb-12">
        <Link to="/admin" className="bg-white px-8 py-2 border border-green-500 rounded text-green-700 shadow font-bold hover:bg-green-50">Home</Link>
        <button onClick={handleLogout} className="bg-white px-8 py-2 border border-green-500 rounded text-green-700 shadow font-bold hover:bg-green-50">LogOut</button>
      </div>

      <div className="w-full flex justify-center">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          
          <Route path="/maintain-user" element={<MaintainUserMenu />} />
          <Route path="/maintain-vendor" element={<MaintainVendorMenu />} />

          <Route path="/user/membership/add" element={<AddEntityForm entityType="UserMembership" />} />
          <Route path="/user/membership/update" element={<UpdateEntityList entityType="UserMembership" />} />

          <Route path="/vendor/membership/add" element={<AddEntityForm entityType="VendorMembership" />} />
          <Route path="/vendor/membership/update" element={<UpdateEntityList entityType="VendorMembership" />} />

          <Route path="/user/add" element={<AddEntityForm entityType="User" />} />
          <Route path="/user/update" element={<UpdateEntityList entityType="User" />} />

          <Route path="/vendor/add" element={<AddEntityForm entityType="Vendor" />} />
          <Route path="/vendor/update" element={<UpdateEntityList entityType="Vendor" />} />
        </Routes>
      </div>
    </div>
  );
};

const AdminHome = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-3xl">
      <div className="bg-white px-32 py-3 rounded mb-24 text-green-700 border border-green-500 font-bold shadow">
        Welcome Admin
      </div>
      
      <div className="flex w-full justify-between px-10">
        <Link to="/admin/maintain-user" className="bg-white px-12 py-3 border border-green-500 rounded text-green-700 font-bold shadow hover:bg-green-50">Maintain User</Link>
        <Link to="/admin/maintain-vendor" className="bg-white px-12 py-3 border border-green-500 rounded text-green-700 font-bold shadow hover:bg-green-50">Maintain Vendor</Link>
      </div>
    </div>
  );
};

const MaintainUserMenu = () => {
  return (
    <div className="flex flex-col items-center space-y-12 w-full max-w-lg">
      <div className="flex items-center gap-12 w-full justify-center">
        <div className="bg-white px-6 py-3 border border-green-500 rounded text-green-700 font-medium text-center w-48 shadow">
          Membership
        </div>
        <div className="flex flex-col gap-2 w-32">
          <Link to="/admin/user/membership/add" className="bg-white py-1 border border-green-500 rounded text-green-700 text-center font-medium shadow hover:bg-green-50">Add</Link>
          <Link to="/admin/user/membership/update" className="bg-white py-1 border border-green-500 rounded text-green-700 text-center font-medium shadow hover:bg-green-50">Update</Link>
        </div>
      </div>

      <div className="flex items-center gap-12 w-full justify-center">
        <div className="bg-white px-6 py-3 border border-green-500 rounded text-green-700 font-medium text-center w-48 shadow">
          User Management
        </div>
        <div className="flex flex-col gap-2 w-32">
          <Link to="/admin/user/add" className="bg-white py-1 border border-green-500 rounded text-green-700 text-center font-medium shadow hover:bg-green-50">Add</Link>
          <Link to="/admin/user/update" className="bg-white py-1 border border-green-500 rounded text-green-700 text-center font-medium shadow hover:bg-green-50">Update</Link>
        </div>
      </div>
    </div>
  );
};

const MaintainVendorMenu = () => {
  return (
    <div className="flex flex-col items-center space-y-12 w-full max-w-lg">
      <div className="flex items-center gap-12 w-full justify-center">
        <div className="bg-white px-6 py-3 border border-green-500 rounded text-green-700 font-medium text-center w-48 shadow">
          Membership
        </div>
        <div className="flex flex-col gap-2 w-32">
          <Link to="/admin/vendor/membership/add" className="bg-white py-1 border border-green-500 rounded text-green-700 text-center font-medium shadow hover:bg-green-50">Add</Link>
          <Link to="/admin/vendor/membership/update" className="bg-white py-1 border border-green-500 rounded text-green-700 text-center font-medium shadow hover:bg-green-50">Update</Link>
        </div>
      </div>

      <div className="flex items-center gap-12 w-full justify-center">
        <div className="bg-white px-6 py-3 border border-green-500 rounded text-green-700 font-medium text-center w-48 shadow">
          Vendor Management
        </div>
        <div className="flex flex-col gap-2 w-32">
          <Link to="/admin/vendor/add" className="bg-white py-1 border border-green-500 rounded text-green-700 text-center font-medium shadow hover:bg-green-50">Add</Link>
          <Link to="/admin/vendor/update" className="bg-white py-1 border border-green-500 rounded text-green-700 text-center font-medium shadow hover:bg-green-50">Update</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
