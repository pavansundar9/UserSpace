import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { UserProvider, useUser } from './components/UserContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import UsersList from './components/UsersList';
import EditUser from './components/EditUser';

const PrivateRoute = ({ children }) => {
  const { currentUser, reqresToken } = useUser();
  const location = useLocation();

  if (!currentUser && !reqresToken) {
    // Redirect to login while preserving the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/users" 
        element={
          <PrivateRoute>
            <UsersList />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/edit/:id" 
        element={
          <PrivateRoute>
            <EditUser />
          </PrivateRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/users" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Navbar />
          <AppRoutes />
          <footer className="footer">
            <p>Designed and Developed by PAVAN SUNDAR &copy; 2024</p>
          </footer>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
