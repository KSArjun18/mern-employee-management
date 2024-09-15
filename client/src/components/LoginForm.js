import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService'; 

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, username } = await login({ f_Email: email, password });
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      toast.success('Login successful!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
      setTimeout(() => {
        navigate('/dashboard'); 
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Login failed. Please try again.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
    }
  };

  return (
    <div className="login-container mt-5">
      <ToastContainer  />
      <div className="login-card mt-5">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <div className="text-center mt-3 d-flex flex-column">
        <h6 className='text-white mb-'>Test Email & Password</h6>
          <p className='text-white mb-0'> arjun@gmail.com</p>
          <p className='text-white mb-0'> 123456</p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
