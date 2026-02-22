import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API = 'http://localhost:3001/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('auris_token');
    const savedUser = localStorage.getItem('auris_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const persistSession = (jwt, userData) => {
    setToken(jwt);
    setUser(userData);
    localStorage.setItem('auris_token', jwt);
    localStorage.setItem('auris_user', JSON.stringify(userData));
  };

  const signup = async ({ name, email, password, role }) => {
    const res = await fetch(`${API}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Signup failed');
    persistSession(data.token, data.user);
    return data.user;
  };

  const login = async ({ email, password }) => {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    persistSession(data.token, data.user);
    return data.user;
  };

  const saveOnboarding = async (bioData) => {
    const res = await fetch(`${API}/onboarding`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bioData }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to save onboarding');
    const updated = { ...user, bioData: data.user.bioData, onboardingComplete: true };
    setUser(updated);
    localStorage.setItem('auris_user', JSON.stringify(updated));
    return updated;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auris_token');
    localStorage.removeItem('auris_user');
  };

  const isAuthenticated = !!token;
  const isDoctor = user?.role === 'doctor';
  const isPatient = user?.role === 'patient';

  return (
    <AuthContext.Provider value={{
      user, token, loading,
      isAuthenticated, isDoctor, isPatient,
      signup, login, logout, saveOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
};
