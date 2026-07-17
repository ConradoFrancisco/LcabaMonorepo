'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface Iuser {
  id_user: number;
  dn: string;
  email: string;
  groups: string[];
  name: string;
  surname?: string;
  sub: string;
  username: string;
}

interface AuthState {
  user: Iuser | null;
  token: string | null;
  loading: boolean;
}

interface AuthContextType {
  auth: AuthState;
  login: (user: Iuser, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INACTIVITY_LIMIT = 30 * 60 * 1000;

function getTokenExpiry(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return typeof payload.exp === 'number' ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

function clearSession() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('lastActivity');
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
  });

  // Restore session from sessionStorage on mount — only if token is valid AND activity was recent
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('user');
    const lastActivity = sessionStorage.getItem('lastActivity');

    const expiry = storedToken ? getTokenExpiry(storedToken) : null;
    const isTokenValid = storedToken && expiry !== null && expiry > Date.now();
    const isRecentlyActive =
      lastActivity !== null && Date.now() - parseInt(lastActivity) < INACTIVITY_LIMIT;

    if (storedToken && storedUser && isTokenValid && isRecentlyActive) {
      setAuth({ user: JSON.parse(storedUser), token: storedToken, loading: false });
    } else {
      clearSession();
      setAuth((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const login = (user: Iuser, token: string) => {
    setAuth({ user, token, loading: false });
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('lastActivity', Date.now().toString());
  };

  const logout = useCallback(() => {
    setAuth({ user: null, token: null, loading: false });
    clearSession();
  }, []);

  // Auto-logout when JWT expires
  useEffect(() => {
    if (!auth.token) return;

    const expiry = getTokenExpiry(auth.token);
    if (expiry === null) return;

    const msUntilExpiry = expiry - Date.now();
    if (msUntilExpiry <= 0) {
      logout();
      return;
    }

    const expiryTimer = setTimeout(() => {
      sessionStorage.setItem('loggedOutByInactivity', 'true');
      logout();
    }, msUntilExpiry);

    return () => clearTimeout(expiryTimer);
  }, [auth.token, logout]);

  // Inactivity timer — resets on any user interaction and updates lastActivity
  useEffect(() => {
    let inactivityTimer: ReturnType<typeof setTimeout> | null = null;

    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      sessionStorage.setItem('lastActivity', Date.now().toString());

      if (auth.token) {
        inactivityTimer = setTimeout(() => {
          sessionStorage.setItem('loggedOutByInactivity', 'true');
          logout();
        }, INACTIVITY_LIMIT);
      }
    };

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [auth.token, logout]);

  // Check inactivity when the tab becomes visible again (covers PC wake from sleep/hibernate)
  useEffect(() => {
    if (!auth.token) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') return;
      const lastActivity = sessionStorage.getItem('lastActivity');
      if (!lastActivity || Date.now() - parseInt(lastActivity) > INACTIVITY_LIMIT) {
        sessionStorage.setItem('loggedOutByInactivity', 'true');
        logout();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [auth.token, logout]);

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
