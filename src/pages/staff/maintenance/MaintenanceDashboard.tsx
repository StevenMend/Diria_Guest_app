// src/pages/staff/maintenance/MaintenanceDashboard.tsx
import React from 'react';
import { Wrench, Calendar, Users, Clock, TrendingUp } from 'lucide-react';

export default function MaintenanceDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-orange-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
              <Wrench className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Maintenance Dashboard</h1>
              <p className="text-gray-600">Facility & Equipment Management</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-orange-200">
            <Calendar className="w-8 h-8 text-orange-600 mb-2" />
            <p className="text-gray-600 text-sm">Open Tickets</p>
            <p className="text-3xl font-bold text-orange-600">7</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-orange-200">
            <Users className="w-8 h-8 text-orange-600 mb-2" />
            <p className="text-gray-600 text-sm">Technicians Available</p>
            <p className="text-3xl font-bold text-orange-600">5</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-orange-200">
            <TrendingUp className="w-8 h-8 text-orange-600 mb-2" />
            <p className="text-gray-600 text-sm">Completed This Week</p>
            <p className="text-3xl font-bold text-orange-600">32</p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-8 text-center border-2 border-orange-200">
          <Clock className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
          <p className="text-gray-600">Full maintenance management features in development</p>
        </div>
      </div>
    </div>
  );
}