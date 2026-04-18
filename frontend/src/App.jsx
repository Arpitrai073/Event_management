import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import AdminDashboard from './pages/admin/AdminDashboard';
import VendorDashboard from './pages/vendor/VendorDashboard';
import UserDashboard from './pages/user/UserDashboard';
import ChartLink from './components/ChartLink';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative flex flex-col">
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
          <Link to="/" className="text-xl font-bold">Event Management System</Link>
          <ChartLink />
        </header>
        <main className="flex-1 p-6 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Auth Routes */}
            <Route path="/login/admin" element={<Login role="Admin" />} />
            <Route path="/login/vendor" element={<Login role="Vendor" />} />
            <Route path="/login/user" element={<Login role="User" />} />
            
            <Route path="/signup/vendor" element={<Signup role="Vendor" />} />
            <Route path="/signup/user" element={<Signup role="User" />} />
            
            {/* Dashboard Routes (Mock Protected) */}
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/vendor/*" element={<VendorDashboard />} />
            <Route path="/user/*" element={<UserDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
