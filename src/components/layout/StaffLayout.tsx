// src/components/layout/StaffLayout.tsx - FONDO CONSISTENTE
import React from 'react';
import { Outlet } from 'react-router-dom';
import StaffHeader from '../staff/StaffHeader';

export default function StaffLayout() {
  return (
    <div className="min-h-screen bg-white">
      <StaffHeader />
      <Outlet />
    </div>
  );
}