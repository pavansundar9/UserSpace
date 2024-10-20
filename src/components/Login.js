import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useUser } from './UserContext';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setReqresToken } = useUser();

  useEffect(() => {
    console.log('Current location:', location.pathname);
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { email, password } = formData;

    try {
      // Reqres login - keeping this exactly the same
      if (email === 'eve.holt@reqres.in' && password === 'cityslicka') {
        console.log('Attempting Reqres login...');
        const reqresResponse = await axios.post(
          'https://reqres.in/api/login',
          { email, password },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (reqresResponse.data?.token) {
          console.log('Reqres Login Successful, token:', reqresResponse.data.token);
          localStorage.setItem('reqresToken', reqresResponse.data.token);
          setReqresToken(reqresResponse.data.token);
          console.log(reqresResponse.data.token);
          console.log('Attempting navigation to /users');
          navigate('/users');
          console.log('Navigation function called');
        } else {
          throw new Error('No token received from Reqres');
        }
      } else {
        // Modified Firebase login with better error handling and state management
        console.log('Attempting Firebase login...');
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        if (userCredential.user) {
          console.log('Firebase Login Successful', userCredential);
          // Store Firebase user data
          localStorage.setItem('firebaseUser', JSON.stringify({
            uid: userCredential.user.uid,
            email: userCredential.user.email
          }));
          
          // Navigate after successful Firebase login
          console.log('Attempting navigation to /users');
          navigate('/users', { replace: true });
          console.log('Navigation function called');
        } else {
          throw new Error('Firebase login succeeded but no user data received');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
            setError('No user found with this email.');
            break;
          case 'auth/wrong-password':
            setError('Incorrect password.');
            break;
          case 'auth/invalid-email':
            setError('Invalid email format.');
            break;
          case 'auth/too-many-requests':
            setError('Too many failed attempts. Please try again later.');
            break;
          case 'auth/network-request-failed':
            setError('Network error. Please check your connection.');
            break;
          default:
            setError('Login failed. Please check your credentials and try again.');
            break;
        }
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login to Your Account</h2>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="auth-button">
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="auth-links">
          <Link to="/register" className="auth-link">
            Don't have an account? Register here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;