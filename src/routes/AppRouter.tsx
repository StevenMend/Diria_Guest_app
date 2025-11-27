// src/routes/AppRouter.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthProvider';
import { ErrorBoundary } from '../components/shared/ErrorBoundary';
import AppShell from '../components/AppShell';
import { PublicRoutes } from './PublicRoutes';
import { GuestRoutes } from './GuestRoutes';
import { StaffRoutes } from './StaffRoutes';
import { AdminRoutes } from './AdminRoutes';
import { ROUTE_PATHS } from '../config/routes';

/**
 * Application Router
 * Manages routing for all user types (public, guest, staff, admin)
 * 
 * Note: QueryClientProvider is in main.tsx
 * Note: CoordinationProvider removed (not used)
 */
export function AppRouter() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AppShell>
            <Routes>
              <Route path="/*" element={<PublicRoutes />} />
              <Route path={`${ROUTE_PATHS.guest.base}/*`} element={<GuestRoutes />} />
              <Route path={`${ROUTE_PATHS.staff.base}/*`} element={<StaffRoutes />} />
              <Route path={`${ROUTE_PATHS.admin.base}/*`} element={<AdminRoutes />} />
              <Route path="*" element={<Navigate to={ROUTE_PATHS.landing} replace />} />
            </Routes>
          </AppShell>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
