// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../AuthProvider';
// import { ROUTE_PATHS } from '../../config/routes';

// export default function AdminGuard() {
//   const { isAuthenticated, isRole } = useAuth();

//   if (!isAuthenticated || !isRole('admin')) {
//     return <Navigate to={ROUTE_PATHS.auth.admin} replace />;
//   }

//   return <Outlet />;
// }
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { ROUTE_PATHS } from '../../config/routes';

export default function AdminGuard() {
  const { isAuthenticated, isRole } = useAuth();

  // 🔥 DEVELOPMENT BYPASS
  if (import.meta.env.MODE === 'development') {
    console.log('🔓 AdminGuard BYPASSED (development mode)');
    return <Outlet />;
  }

  if (!isAuthenticated || !isRole('admin')) {
    return <Navigate to={ROUTE_PATHS.auth.admin} replace />;
  }

  return <Outlet />;
}