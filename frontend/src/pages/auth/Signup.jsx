import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';

const Signup = ({ role }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('Catering');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, email, password, role };
      if (role === 'Vendor') payload.category = category;
      
      const res = await API.post('/auth/register', payload);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate(`/${role.toLowerCase()}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center flex-1">
      <div className="bg-gray-300 p-8 rounded shadow-lg max-w-md w-full border border-gray-400">
        <h2 className="bg-blue-300 text-center py-2 mb-6 font-semibold border border-blue-400">
          Event Management System
        </h2>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="bg-blue-600 text-white px-4 py-2 rounded min-w-[100px] text-center">Name</label>
            <input 
              type="text" 
              placeholder={role} 
              className="flex-1 bg-blue-200 border border-blue-300 px-3 py-2"
              value={name} onChange={(e) => setName(e.target.value)} required
            />
          </div>
          
          <div className="flex items-center gap-4">
            <label className="bg-blue-600 text-white px-4 py-2 rounded min-w-[100px] text-center">Email</label>
            <input 
              type="email" 
              placeholder={role} 
              className="flex-1 bg-blue-200 border border-blue-300 px-3 py-2"
              value={email} onChange={(e) => setEmail(e.target.value)} required
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="bg-blue-600 text-white px-4 py-2 rounded min-w-[100px] text-center">Password</label>
            <input 
              type="password" 
              placeholder={role} 
              className="flex-1 bg-blue-200 border border-blue-300 px-3 py-2"
              value={password} onChange={(e) => setPassword(e.target.value)} required
            />
          </div>

          {role === 'Vendor' && (
            <div className="flex items-center gap-4">
              <label className="bg-blue-600 text-white px-4 py-2 rounded min-w-[100px] text-center">Category</label>
              <select 
                className="flex-1 bg-blue-200 border border-blue-300 px-3 py-2"
                value={category} onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Catering">Catering</option>
                <option value="Florist">Florist</option>
                <option value="Decoration">Decoration</option>
                <option value="Lighting">Lighting</option>
              </select>
            </div>
          )}

          <div className="flex justify-center mt-8 pt-4">
            <button type="submit" className="px-8 py-2 bg-blue-500 text-white rounded border border-blue-600 shadow hover:bg-blue-600">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
