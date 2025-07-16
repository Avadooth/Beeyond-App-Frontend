import { createContext, useContext, useEffect, useState } from 'react';
import { getUser, logout as performLogout } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const existingUser = getUser();
    if (existingUser) setUser(existingUser);
  }, []);

  const login = (user) => setUser(user);

  const logout = () => {
    performLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
