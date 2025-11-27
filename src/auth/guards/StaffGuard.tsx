// src/auth/guards/StaffGuard.tsx - WITH DEPARTMENT-BASED SMART REDIRECT
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { useAuthStore } from '../../lib/stores/useAuthStore';
import { supabase } from '../../lib/api/supabase';
import { ROUTE_PATHS } from '../../config/routes';

interface StaffInfo {
  restaurant_id: string | null;
  department_id: string | null;
  department_name: string | null;
}

export default function StaffGuard() {
  const { isAuthenticated, isRole } = useAuth();
  const session = useAuthStore((state) => state.session);
  const location = useLocation();
  
  const [staffInfo, setStaffInfo] = useState<StaffInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffInfo = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('staff')
          .select(`
            restaurant_id,
            department_id,
            departments (
              name
            )
          `)
          .eq('id', session.user.id)
          .single();

        if (error) throw error;

        setStaffInfo({
          restaurant_id: data.restaurant_id,
          department_id: data.department_id,
          department_name: data.departments?.name || null
        });

        console.log('✅ Staff info loaded:', {
          department: data.departments?.name,
          restaurant: data.restaurant_id
        });
      } catch (err) {
        console.error('❌ Error fetching staff info:', err);
        setStaffInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffInfo();
  }, [session?.user?.id]);

  // 🔥 DEVELOPMENT BYPASS
  if (import.meta.env.MODE === 'development') {
    console.log('🔓 StaffGuard BYPASSED (development mode)');
    
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    // Smart redirect based on department
    if (location.pathname === '/staff' || location.pathname === '/staff/') {
      const redirectPath = getDepartmentRedirect(staffInfo);
      console.log('🎯 Smart redirect to:', redirectPath);
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  }

  // Production guards
  if (!isAuthenticated || !isRole('staff')) {
    return <Navigate to={ROUTE_PATHS.auth.staff} replace />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Smart redirect based on department
  if (location.pathname === '/staff' || location.pathname === '/staff/') {
    const redirectPath = getDepartmentRedirect(staffInfo);
    console.log('🎯 Smart redirect to:', redirectPath);
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

// 🎯 DEPARTMENT ROUTING LOGIC
function getDepartmentRedirect(staffInfo: StaffInfo | null): string {
  if (!staffInfo?.department_name) {
    return '/staff/console';
  }

  const deptName = staffInfo.department_name;

  switch(deptName) {
    case 'Food & Beverage':
      // Si tiene restaurant_id → ir a ese restaurant
      // Si NO tiene → ir a console
      return staffInfo.restaurant_id ? '/staff/restaurant' : '/staff/console';
    
    case 'Tours & Activities':
      return '/staff/concierge/tours';
    
    case 'Spa':
      return '/staff/spa';
    
    case 'Housekeeping':
      return '/staff/housekeeping';
    
    case 'Maintenance':
      return '/staff/maintenance';
    
    case 'Transportation':
      return '/staff/transportation';
    
    case 'Concierge':
      return '/staff/concierge';
    
    case 'Front Desk':
    case 'General Services':
    default:
      return '/staff/console';
  }
}