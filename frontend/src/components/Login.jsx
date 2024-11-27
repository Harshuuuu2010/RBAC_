import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', formData);
      
      // Store token and role in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);  // Store role as well
  
      navigate('/dashboard');  // Navigate to dashboard
    } catch (err) {
      console.error(err.response.data.message || 'Login failed');
      alert(err.response.data.message || 'Login failed');
    }
  };
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
