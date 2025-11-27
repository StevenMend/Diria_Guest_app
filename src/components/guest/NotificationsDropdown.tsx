// src/components/guest/NotificationsDropdown.tsx
import React from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'warning' | 'info';
  read: boolean;
}

interface NotificationsDropdownProps {
  isOpen: boolean;
  notifications: Notification[];
  onClose: () => void;
}

export default function NotificationsDropdown({ isOpen, notifications, onClose }: NotificationsDropdownProps) {
  if (!isOpen) return null;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm modal-backdrop"
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div className="fixed top-20 right-6 w-80 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 z-50 overflow-hidden notification-enter modal-content">
        <div className="p-4 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Notifications</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Clear all
            </button>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <div className="text-sm">No new notifications</div>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 border-b border-gray-200/30 hover:bg-white/50 transition-colors duration-200 hover:scale-[1.02] gpu-accelerated ${
                  !notification.read ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${getNotificationColor(notification.type)}`}></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">{notification.title}</div>
                    <div className="text-gray-600 text-sm">{notification.message}</div>
                    <div className="text-gray-500 text-xs mt-1">{notification.time}</div>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}