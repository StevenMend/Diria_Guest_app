// src/features/tours/staff/pages/ToursDashboard.tsx
import React from 'react';
import { MapPin, Calendar, Users, Clock, TrendingUp } from 'lucide-react';

export default function ToursDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-blue-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tours Dashboard</h1>
              <p className="text-gray-600">Activities & Excursions Management</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-blue-200">
            <Calendar className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-gray-600 text-sm">Today's Tours</p>
            <p className="text-3xl font-bold text-blue-600">18</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-blue-200">
            <Users className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-gray-600 text-sm">Total Guests</p>
            <p className="text-3xl font-bold text-blue-600">156</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-blue-200">
            <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-gray-600 text-sm">Bookings This Week</p>
            <p className="text-3xl font-bold text-blue-600">94</p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-8 text-center border-2 border-blue-200">
          <Clock className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
          <p className="text-gray-600">Full tours management features in development</p>
        </div>
      </div>
    </div>
  );
}