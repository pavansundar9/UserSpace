import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reqresToken } = useUser();
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!reqresToken) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser(response.data.data);
      } catch (error) {
        setError('Error fetching user data');
      }
    };

    fetchUser();
  }, [id, reqresToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      
      // Store the updated user in local storage
      const updatedUsers = JSON.parse(localStorage.getItem('updatedUsers') || '{}');
      updatedUsers[id] = user;
      localStorage.setItem('updatedUsers', JSON.stringify(updatedUsers));

      navigate('/users');
    } catch (error) {
      setError('Error updating user');
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit User</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="edit-form">
        <input
          type="text"
          placeholder="First Name"
          value={user.first_name}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;