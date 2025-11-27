// src/pages/staff/transportation/TransportationDashboard.tsx
import React from 'react';
import { Car, Calendar, Users, Clock, TrendingUp } from 'lucide-react';

export default function TransportationDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
              <Car className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Transportation Dashboard</h1>
              <p className="text-gray-600">Fleet & Transfer Management</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-200">
            <Calendar className="w-8 h-8 text-gray-600 mb-2" />
            <p className="text-gray-600 text-sm">Today's Transfers</p>
            <p className="text-3xl font-bold text-gray-600">15</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-200">
            <Users className="w-8 h-8 text-gray-600 mb-2" />
            <p className="text-gray-600 text-sm">Drivers Available</p>
            <p className="text-3xl font-bold text-gray-600">6</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-200">
            <TrendingUp className="w-8 h-8 text-gray-600 mb-2" />
            <p className="text-gray-600 text-sm">Vehicles Active</p>
            <p className="text-3xl font-bold text-gray-600">10</p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-8 text-center border-2 border-gray-200">
          <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
          <p className="text-gray-600">Full transportation management features in development</p>
        </div>
      </div>
    </div>
  );
}