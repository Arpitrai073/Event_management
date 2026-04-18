import API from '../../api';

const Login = ({ role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password, role });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate(`/${role.toLowerCase()}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center flex-1">
      <div className="bg-gray-300 p-8 rounded shadow-lg max-w-md w-full border border-gray-400">
        <h2 className="bg-blue-300 text-center py-2 mb-6 font-semibold border border-blue-400">
          Event Management System
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="bg-blue-600 text-white px-4 py-2 rounded min-w-[100px] text-center">User Id</label>
            <input 
              type="text" 
              placeholder={role} 
              className="flex-1 bg-blue-200 border border-blue-300 px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="flex items-center gap-4">
            <label className="bg-blue-600 text-white px-4 py-2 rounded min-w-[100px] text-center">Password</label>
            <input 
              type="password" 
              placeholder={role} 
              className="flex-1 bg-blue-200 border border-blue-300 px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-4 mt-8 pt-4">
            <button 
              type="button" 
              onClick={() => navigate('/')} 
              className="px-6 py-2 bg-gray-500 text-black rounded border border-gray-600 shadow"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-gray-500 text-black rounded border border-gray-600 shadow"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
