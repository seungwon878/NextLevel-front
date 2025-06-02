import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // localStorage에서 인증 상태 초기화
    return Boolean(localStorage.getItem('token'));
  });

   const [username, setUsername] = useState<string | null>(() => {
    // localStorage에서 username 초기화
    return localStorage.getItem('username');
  });

  const login = (newUsername: string) => {
    setIsAuthenticated(true);
    setUsername(newUsername);
    localStorage.setItem('username', newUsername);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AppProvider');
  }
  return context;
}
