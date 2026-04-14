import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [token, setToken]     = useState(null);
  const [loading, setLoading] = useState(true); // hydrating from localStorage

  // ── Hydrate from localStorage on mount ────────────────────────
  useEffect(() => {
    const storedToken = localStorage.getItem('clouderp_token');
    const storedUser  = localStorage.getItem('clouderp_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ── Login ──────────────────────────────────────────────────────
  const login = useCallback((userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('clouderp_token', jwtToken);
    localStorage.setItem('clouderp_user',  JSON.stringify(userData));
  }, []);

  // ── Logout ─────────────────────────────────────────────────────
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('clouderp_token');
    localStorage.removeItem('clouderp_user');
  }, []);

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Custom hook ────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
