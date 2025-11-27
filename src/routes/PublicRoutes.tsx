
// ========================================
// 3. src/routes/PublicRoutes.tsx - CORRECTED
// ========================================
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { getDefaultRouteForRole } from '../config/routes';
import GuestLanding from '../pages/public/GuestLanding';
import StaffPortal from '../pages/public/StaffPortal';
import GuestAuthForm from '../auth/forms/GuestAuthForm';
import StaffAuthForm from '../auth/forms/StaffAuthForm';
import AdminAuthForm from '../auth/forms/AdminAuthForm';

export function PublicRoutes() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    return <Navigate to={getDefaultRouteForRole(user.role)} replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<GuestLanding />} />
      <Route path="/portal" element={<StaffPortal />} />
      <Route path="/auth/guest" element={<GuestAuthForm />} />
      <Route path="/auth/staff" element={<StaffAuthForm />} />
      <Route path="/auth/admin" element={<AdminAuthForm />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}