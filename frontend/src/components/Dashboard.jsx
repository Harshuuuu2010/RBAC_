import React, { useEffect, useState, useCallback } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [role, setRole] = useState(''); 
  const navigate = useNavigate();

  
  const fetchData = useCallback(async () => {
    try {
      
      const response = await API.get('/auth/login'); 
      const userRole = response.data.role; 
      setRole(userRole); 
      const roleResponse = await API.get(`/user/${userRole}`); 
      setMessage(roleResponse.data.message);
    } catch (err) {
      console.error('Error:', err.response || err);
      alert('Error fetching data. Check permissions or login again.');
      navigate('/login'); 
    }
  }, [navigate]); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); 
    navigate('/login');
  };

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      
      setRole(storedRole);
      API.get(`/user/${storedRole}`)
        .then((res) => setMessage(res.data.message))
        .catch((err) => {
          console.error('Error fetching message for role:', err.response || err);
          alert('Error fetching data. Login again.');
          navigate('/login');
        });
    } else {
      fetchData();
    }
  }, [fetchData, navigate]); 

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p>{`Role: ${role}`}</p> 
      <p>{message}</p> 
      <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
