// src/pages/staff/concierge/widgets/TourCoordinationWidget.tsx
import React from 'react';
import { MapPin, Users, Calendar, Clock } from 'lucide-react';

interface TourBooking {
  id: string;
  tourName: string;
  guestCount: number;
  time: string;
  status: 'pending' | 'confirmed' | 'in_progress';
}

export function TourCoordinationWidget() {
  // Mock data - replace with real data from useToursStaff hook
  const upcomingTours: TourBooking[] = [
    {
      id: '1',
      tourName: 'Zip Line Canopy',
      guestCount: 4,
      time: '09:00 AM',
      status: 'confirmed'
    },
    {
      id: '2',
      tourName: 'Sunset Sailing',
      guestCount: 2,
      time: '04:30 PM',
      status: 'confirmed'
    },
    {
      id: '3',
      tourName: 'ATV Adventure',
      guestCount: 6,
      time: '10:30 AM',
      status: 'pending'
    }
  ];

  const stats = {
    todayBookings: 12,
    activePartners: 8,
    pendingConfirmations: 3
  };

  return (
    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-3 border-b border-indigo-200">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-white" />
          <h3 className="font-bold text-white text-sm">Tour Coordination</h3>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-4 bg-indigo-50/50 border-b border-gray-200">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto mb-1 shadow-sm border border-indigo-100">
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-xl font-bold text-indigo-600">{stats.todayBookings}</p>
            <p className="text-xs text-gray-600">Today</p>
          </div>
          
          <div className="text-center border-x border-gray-200">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto mb-1 shadow-sm border border-green-100">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-xl font-bold text-green-600">{stats.activePartners}</p>
            <p className="text-xs text-gray-600">Partners</p>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto mb-1 shadow-sm border border-yellow-100">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-xl font-bold text-yellow-600">{stats.pendingConfirmations}</p>
            <p className="text-xs text-gray-600">Pending</p>
          </div>
        </div>
      </div>

      {/* Upcoming Tours */}
      <div className="p-4">
        <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Upcoming Tours Today
        </h4>
        
        <div className="space-y-2">
          {upcomingTours.map((tour) => (
            <div
              key={tour.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm mb-1">
                  {tour.tourName}
                </p>
                <div className="flex items-center space-x-3 text-xs text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{tour.guestCount} guests</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{tour.time}</span>
                  </span>
                </div>
              </div>
              
              <div>
                {tour.status === 'confirmed' && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-lg border border-green-200">
                    ✓ Confirmed
                  </span>
                )}
                {tour.status === 'pending' && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-lg border border-yellow-200">
                    ⏳ Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {upcomingTours.length === 0 && (
          <div className="text-center py-6">
            <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">No tours scheduled</p>
          </div>
        )}
      </div>

      {/* View All Button */}
      <div className="px-4 pb-4">
        <button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2 rounded-lg text-sm font-semibold transition-colors border border-indigo-200">
          View All Tours →
        </button>
      </div>
    </div>
  );
}