import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [reqresToken, setReqresToken] = useState(localStorage.getItem('reqresToken'));

  useEffect(() => {
    const token = localStorage.getItem('reqresToken');
    if (token) {
      setReqresToken(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, reqresToken, setReqresToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
