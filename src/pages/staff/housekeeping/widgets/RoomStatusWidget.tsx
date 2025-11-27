// src/pages/staff/housekeeping/widgets/RoomStatusWidget.tsx
import React from 'react';

interface StatusCardProps {
  icon: string;
  label: string;
  count: number;
  color: 'green' | 'red' | 'blue' | 'gray';
}

const StatusCard: React.FC<StatusCardProps> = ({ icon, label, count, color }) => {
  const colorClasses = {
    green: 'bg-green-50 text-green-700 border-green-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200'
  };

  return (
    <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold">{count}</div>
      <div className="text-xs opacity-80">{label}</div>
    </div>
  );
};

export const RoomStatusWidget: React.FC = () => {
  // MOCK DATA (replace with real data later)
  const roomStatus = {
    clean: 120,
    dirty: 15,
    inProgress: 8,
    inspected: 100,
    occupied: 180,
    vacant: 63
  };

  const totalRooms = 243;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900">
        🏨 Room Status Overview
      </h3>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <StatusCard
          icon="✓"
          label="Clean"
          count={roomStatus.clean}
          color="green"
        />
        <StatusCard
          icon="⚠"
          label="Dirty"
          count={roomStatus.dirty}
          color="red"
        />
        <StatusCard
          icon="🔄"
          label="In Progress"
          count={roomStatus.inProgress}
          color="blue"
        />
        <StatusCard
          icon="👁"
          label="Inspected"
          count={roomStatus.inspected}
          color="gray"
        />
      </div>

      {/* Occupancy Bar */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Occupancy</span>
          <span className="font-semibold">{Math.round((roomStatus.occupied / totalRooms) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(roomStatus.occupied / totalRooms) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{roomStatus.occupied} Occupied</span>
          <span>{roomStatus.vacant} Vacant</span>
        </div>
      </div>
    </div>
  );
};