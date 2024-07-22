import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

// Replace with your Google Client ID
const CLIENT_ID = '999243495316-5lm2anl3lepeeksil6vigg6fq6gd76ta.apps.googleusercontent.com';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic (simplified for this example)
    if (email === 'user@example.com' && password === 'password') {
      localStorage.setItem('authToken', 'your_auth_token');
      navigate('/todo');
    } else {
      alert('Invalid email or password');
    }
  };

  const handleGoogleSuccess = (response) => {
    console.log('Login Success:', response);
    localStorage.setItem('authToken', response.tokenId);
    navigate('/todo');
  };

  const handleGoogleFailure = (response) => {
    console.log('Login Failure:', response);
    alert('Google login failed');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a onClick={() => navigate("/")} className="cursor-pointer text-xl font-bold">
            Task Manager
          </a>
          <div>
            <a onClick={() => navigate("/login")} className="mr-4 cursor-pointer hover:text-gray-300">
              Login
            </a>
            <a onClick={() => navigate("/signup")} className="cursor-pointer hover:text-gray-300">
              Signup
            </a>
          </div>
        </div>
      </nav>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 mx-auto mt-4">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-600">Don't have an account? <a onClick={() => navigate("/signup")} className="cursor-pointer text-blue-500 hover:underline">Signup</a></p>
          </div>
          <div className="text-center mt-4">
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              cookiePolicy={'single_host_origin'}
              className="bg-white text-black font-bold py-2 px-4 rounded"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;