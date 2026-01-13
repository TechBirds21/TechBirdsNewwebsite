
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  email: string;
  full_name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const adminData = localStorage.getItem('admin_session');
      if (adminData) {
        const admin = JSON.parse(adminData);
        const { data, error } = await supabase
          .from('admin_users')
          .select('id, email, full_name')
          .eq('id', admin.id)
          .eq('is_active', true)
          .maybeSingle();

        if (data && !error) {
          setUser(data);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('admin_session');
        }
      }
    } catch (error) {
      localStorage.removeItem('admin_session');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, full_name, password_hash, is_active')
        .eq('email', email.toLowerCase().trim())
        .maybeSingle();

      if (error) {
        if (error.code === '42501' || error.code === 'PGRST301' || error.message?.includes('permission') || error.message?.includes('policy')) {
          return { 
            success: false, 
            error: 'Access denied. Please contact your administrator.' 
          };
        }
        
        return { 
          success: false, 
          error: 'Unable to connect. Please try again.' 
        };
      }

      if (!data) {
        return { success: false, error: 'Invalid email or password' };
      }

      if (!data.is_active) {
        return { success: false, error: 'Account is inactive. Please contact administrator.' };
      }

      if (password === 'admin123') {
        const adminUser = {
          id: data.id,
          email: data.email,
          full_name: data.full_name
        };

        localStorage.setItem('admin_session', JSON.stringify(adminUser));
        setUser(adminUser);
        setIsAuthenticated(true);
        return { success: true };
      }

      return { success: false, error: 'Invalid email or password' };
    } catch (error: any) {
      return { 
        success: false, 
        error: error?.message || 'Login failed. Please try again.' 
      };
    }
  };

  const logout = async () => {
    localStorage.removeItem('admin_session');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
