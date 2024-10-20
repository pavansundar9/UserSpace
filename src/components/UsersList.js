import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { reqresToken } = useUser();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      let fetchedUsers = response.data.data;

      // Check for locally stored updates
      const updatedUsers = JSON.parse(localStorage.getItem('updatedUsers') || '{}');
      fetchedUsers = fetchedUsers.map(user => {
        if (updatedUsers[user.id]) {
          return { ...user, ...updatedUsers[user.id] };
        }
        return user;
      });

      setUsers(fetchedUsers);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!reqresToken) {
      navigate('/login');
      return;
    }
    fetchUsers();
  }, [page, reqresToken, navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      
      // Remove the user from local storage if it exists
      const updatedUsers = JSON.parse(localStorage.getItem('updatedUsers') || '{}');
      delete updatedUsers[id];
      localStorage.setItem('updatedUsers', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="users-container">
      <h2>Users List</h2>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="users-grid">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                <h3>{`${user.first_name} ${user.last_name}`}</h3>
                <p>{user.email}</p>
                <div className="user-actions">
                  <button onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => p - 1)}
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button 
              disabled={page === totalPages} 
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersList;