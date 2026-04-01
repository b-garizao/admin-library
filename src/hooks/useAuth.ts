import { useState, useEffect, useCallback } from 'react';

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor';
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface UseAuthOptions {
  storageKey?: string;
}

interface UseAuthReturn {
  user: AdminUser | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<AdminUser>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const createUseAuth = (
  loginFn: (credentials: LoginCredentials) => Promise<AdminUser>,
  options: UseAuthOptions = {}
): (() => UseAuthReturn) => {
  const { storageKey = 'admin_user' } = options;

  return () => {
    const [user, setUser] = useState<AdminUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          localStorage.removeItem(storageKey);
        }
      }
      setLoading(false);
    }, [storageKey]);

    const login = useCallback(
      async (credentials: LoginCredentials): Promise<AdminUser> => {
        const userData = await loginFn(credentials);
        setUser(userData);
        localStorage.setItem(storageKey, JSON.stringify(userData));
        return userData;
      },
      [loginFn, storageKey]
    );

    const logout = useCallback(() => {
      setUser(null);
      localStorage.removeItem(storageKey);
    }, [storageKey]);

    return {
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user,
    };
  };
};
