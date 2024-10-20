import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';
import user1 from '../images/user1.jpg'; 
import user2 from '../images/user2.jpg'; 
import user3 from '../images/user3.jpg'; 
import './Navbar.css';

const Navbar = () => {
  const { currentUser, setCurrentUser, reqresToken, setReqresToken } = useUser();
  const navigate = useNavigate();
  
  const images = [user1, user2, user3];
  const [profileImage, setProfileImage] = useState(images[0]); // Set default image

  useEffect(() => {
    const random = Math.floor(Math.random() * images.length);
    setProfileImage(images[random]);
  }, []);

  const handleLogout = async () => {
    try {
      if (auth.currentUser) {
        await signOut(auth);
      }
      localStorage.removeItem('reqresToken');
      setReqresToken(null);
      setCurrentUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="profile-container">
          <img src={profileImage} alt="user_profile_img" className="profile-img" />
        </div>
        <p>UserSphere</p>
      </div>
      <div className="navbar-links">
        {currentUser || reqresToken ? (
          <>
            {/* <Link to="/users">Users</Link> */}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;