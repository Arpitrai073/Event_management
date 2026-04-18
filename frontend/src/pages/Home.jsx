import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-20">
      <h1 className="text-3xl font-bold mb-8 text-gray-700">Welcome to Event Management System</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full px-4">
        
        {/* Admin Card */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Admin</h2>
          <p className="text-gray-500 mb-6 text-center text-sm">Manages users and vendors</p>
          <div className="flex w-full gap-3">
             <Link to="/login/admin" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-center">Login</Link>
          </div>
        </div>

        {/* Vendor Card */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-green-700">Vendor</h2>
          <p className="text-gray-500 mb-6 text-center text-sm">Manage your products, view requests, and update statuses.</p>
          <div className="flex w-full gap-3 flex-col">
             <Link to="/login/vendor" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-center">Login</Link>
             <Link to="/signup/vendor" className="border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded text-center">Sign Up</Link>
          </div>
        </div>

        {/* User Card */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-purple-700">User</h2>
          <p className="text-gray-500 mb-6 text-center text-sm">Browse vendors, add items to cart, and track your events.</p>
          <div className="flex w-full gap-3 flex-col">
             <Link to="/login/user" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-center">Login</Link>
             <Link to="/signup/user" className="border border-purple-600 text-purple-600 hover:bg-purple-50 px-4 py-2 rounded text-center">Sign Up</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
