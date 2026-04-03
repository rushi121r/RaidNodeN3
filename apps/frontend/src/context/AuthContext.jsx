import { createContext, useMemo, useState } from 'react';
import { api, setAuthToken } from '../api/client';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('lane_token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('lane_user');
    return raw ? JSON.parse(raw) : null;
  });

  if (token) setAuthToken(token);

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload);
    setToken(data.token);
    setUser(data.user);
    setAuthToken(data.token);
    localStorage.setItem('lane_token', data.token);
    localStorage.setItem('lane_user', JSON.stringify(data.user));
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    setToken(data.token);
    setUser(data.user);
    setAuthToken(data.token);
    localStorage.setItem('lane_token', data.token);
    localStorage.setItem('lane_user', JSON.stringify(data.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('lane_token');
    localStorage.removeItem('lane_user');
  };

  const value = useMemo(() => ({ token, user, login, register, logout }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
