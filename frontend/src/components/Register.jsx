import React, { useState } from 'react';
import API from '../services/api';  // Ensure this is the correct path to your API service

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user', // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending data:', formData); // Log request payload
      const response = await API.post('/auth/register', formData); // Ensure the endpoint is correct

      // Check if response data contains a message and show it
      if (response.data?.message) {
        alert(response.data.message);  // This will display the success message from the backend
      } else {
        alert('Registration failed, no message received');
      }
    } catch (err) {
      console.error('Error details:', err.response || err); // Log full error for debugging
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
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
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
