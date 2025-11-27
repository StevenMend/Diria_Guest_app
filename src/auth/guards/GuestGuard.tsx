// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../AuthProvider';
// import { ROUTE_PATHS } from '../../config/routes';

// export default function GuestGuard() {
//   const { isAuthenticated, isRole } = useAuth();

//   if (!isAuthenticated || !isRole('guest')) {
//     return <Navigate to={ROUTE_PATHS.auth.guest} replace />;
//   }

//   return <Outlet />;
// }
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { ROUTE_PATHS } from '../../config/routes';

export default function GuestGuard() {
  const { isAuthenticated, isRole } = useAuth();

  // 🔥 DEVELOPMENT BYPASS
  if (import.meta.env.MODE === 'development') {
    console.log('🔓 GuestGuard BYPASSED (development mode)');
    return <Outlet />;
  }

  if (!isAuthenticated || !isRole('guest')) {
    return <Navigate to={ROUTE_PATHS.auth.guest} replace />;
  }

  return <Outlet />;
}