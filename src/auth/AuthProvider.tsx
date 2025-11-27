// src/auth/AuthProvider.tsx - FIXED: Department normalization
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/stores/useAuthStore';
import { UserSession, AuthSession, UserRole } from '../types';
import { SITE_CONFIG } from '../config/site';
import { supabase } from '../lib/api/supabase';

interface AuthContextType {
  session: AuthSession | null;
  user: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  loginAsGuest: (roomNumber?: string, confirmationCode?: string, property?: string) => Promise<void>;
  loginAsStaff: (staffId: string, department: string, password: string, property?: string) => Promise<void>;
  loginAsAdmin: (email: string, password: string, property?: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (resource: string, action: string) => boolean;
  isRole: (role: UserRole) => boolean;
  clearError: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  
  const {
    session,
    isAuthenticated,
    isLoading,
    error,
    authenticateGuest,
    authenticateStaff,
    authenticateAdmin,
    logout: authLogout,
    getUser,
    hasPermission,
    isRole,
    clearError,
    refreshToken
  } = useAuthStore();

  useEffect(() => {
    if (!session) return;
    const tokenExpiresAt = new Date(session.expiresAt).getTime();
    const now = new Date().getTime();
    const timeUntilExpiry = tokenExpiresAt - now;
    const refreshTime = Math.max(0, timeUntilExpiry - 5 * 60 * 1000);
    
    const timeout = setTimeout(() => {
      refreshToken().catch(() => {
        logout();
      });
    }, refreshTime);
    return () => clearTimeout(timeout);
  }, [session, refreshToken]);

  useEffect(() => {
    if (!session) return;
    const role = session.user.role;
    const sessionTimeout = SITE_CONFIG.sessionTimeouts[role];
    const warningTime = sessionTimeout - 10 * 60 * 1000;
    
    const timeout = setTimeout(() => {
      console.warn(`Session expires in 10 minutes for ${role}`);
    }, warningTime);
    return () => clearTimeout(timeout);
  }, [session]);

  const loginAsGuest = async (roomNumber?: string, confirmationCode?: string, property: string = SITE_CONFIG.properties[0]) => {
    await authenticateGuest(roomNumber, confirmationCode, property);
    navigate('/guest/dashboard');
  };

  const loginAsStaff = async (staffId: string, department: string, password: string, property: string = SITE_CONFIG.properties[0]) => {
    if (!SITE_CONFIG.departments.includes(department)) {
      throw new Error(`Invalid department: ${department}`);
    }
    
    console.log('🔐 [AuthProvider] Authenticating staff:', { staffId, department });
    await authenticateStaff(staffId, department, password, property);
    
    // Get current session
    const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !currentSession?.user) {
      console.error('❌ [AuthProvider] No session after authentication:', sessionError);
      throw new Error('Failed to establish session');
    }

    console.log('✅ [AuthProvider] Session established, fetching staff data for user:', currentSession.user.id);

    // Fetch staff details including restaurant info
    const { data: staffData, error: staffError } = await supabase
      .from('staff')
      .select(`
        id,
        name,
        email,
        department,
        department_id,
        restaurant_id,
        restaurants (
          id,
          slug,
          name
        )
      `)
      .eq('id', currentSession.user.id)
      .single();

    if (staffError) {
      console.error('❌ [AuthProvider] Error fetching staff data:', staffError);
      throw new Error('Failed to load staff information');
    }

    if (!staffData) {
      console.error('❌ [AuthProvider] No staff data found for user:', currentSession.user.id);
      throw new Error('Staff record not found');
    }

    console.log('✅ [AuthProvider] Staff data loaded:', {
      name: staffData.name,
      department: staffData.department,
      restaurant_id: staffData.restaurant_id,
      restaurant_slug: staffData.restaurants?.slug
    });

    // SMART ROUTING BASED ON DEPARTMENT (normalized, case-insensitive)
    console.log('🔀 [AuthProvider] Determining route for department:', staffData.department);
    const deptLower = staffData.department.toLowerCase();
    
    // Food & Beverage / Restaurants
    if ((deptLower.includes('food') || deptLower.includes('beverage') || deptLower === 'restaurants') && staffData.restaurant_id) {
      const restaurantSlug = staffData.restaurants?.slug;
      
      if (!restaurantSlug) {
        console.error('❌ [AuthProvider] Restaurant staff missing restaurant slug');
        throw new Error('Restaurant assignment incomplete');
      }
      
      console.log(`🍽️ [AuthProvider] Redirecting to restaurant dashboard: /staff/restaurant/${restaurantSlug}`);
      navigate(`/staff/restaurant/${restaurantSlug}`);
      return;
    } 
    // Housekeeping
    else if (deptLower === 'housekeeping') {
      console.log('🧹 [AuthProvider] Redirecting to housekeeping dashboard');
      navigate('/staff/housekeeping');
      return;
    }
    // Maintenance
    else if (deptLower === 'maintenance') {
      console.log('🔧 [AuthProvider] Redirecting to maintenance dashboard');
      navigate('/staff/maintenance');
      return;
    }
    // Concierge
    else if (deptLower === 'concierge') {
      console.log('🔔 [AuthProvider] Redirecting to concierge dashboard');
      navigate('/staff/concierge');
      return;
    }
    // Spa
    else if (deptLower === 'spa') {
      console.log('💆 [AuthProvider] Redirecting to spa dashboard');
      navigate('/staff/spa');
      return;
    }
    // Tours & Activities
    else if (deptLower.includes('tour') || deptLower.includes('activities')) {
      console.log('🏄 [AuthProvider] Redirecting to tours dashboard');
      navigate('/staff/tours');
      return;
    }
    // Transportation
    else if (deptLower.includes('transport')) {
      console.log('🚗 [AuthProvider] Redirecting to transportation dashboard');
      navigate('/staff/transportation');
      return;
    }
    // Front Desk
    else if (deptLower.includes('front') || deptLower.includes('desk')) {
      console.log('🏨 [AuthProvider] Redirecting to front desk dashboard');
      navigate('/staff/console'); // Front desk usa console genérico por ahora
      return;
    }
    else {
      // Fallback to generic console
      console.warn('⚠️ [AuthProvider] Unknown department:', staffData.department, '- redirecting to generic console');
      navigate('/staff/console');
      return;
    }
  };

  const loginAsAdmin = async (email: string, password: string, property: string = SITE_CONFIG.properties[0]) => {
    await authenticateAdmin(email, password, property);
    navigate('/admin/dashboard');
  };

  const logout = async () => {
    await authLogout();
  };

  const value: AuthContextType = {
    session,
    user: getUser(),
    isAuthenticated,
    isLoading,
    error,
    loginAsGuest,
    loginAsStaff,
    loginAsAdmin,
    logout,
    hasPermission,
    isRole,
    clearError,
    refreshToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}