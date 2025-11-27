// src/features/spa/staff/pages/SpaDashboard.tsx
import React from 'react';
import { Flower2, Calendar, Users, Clock, TrendingUp } from 'lucide-react';

export default function SpaDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-purple-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
              <Flower2 className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Spa Dashboard</h1>
              <p className="text-gray-600">Wellness & Treatment Management</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-purple-200">
            <Calendar className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-gray-600 text-sm">Today's Appointments</p>
            <p className="text-3xl font-bold text-purple-600">12</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-purple-200">
            <Users className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-gray-600 text-sm">Therapists Available</p>
            <p className="text-3xl font-bold text-purple-600">8</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-purple-200">
            <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-gray-600 text-sm">Occupancy Rate</p>
            <p className="text-3xl font-bold text-purple-600">85%</p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-8 text-center border-2 border-purple-200">
          <Clock className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
          <p className="text-gray-600">Full spa management features in development</p>
        </div>
      </div>
    </div>
  );
}