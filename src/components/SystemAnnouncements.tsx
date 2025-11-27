import React, { useState } from 'react';
import { X, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';

interface Announcement {
  id: string;
  type: 'alert' | 'info' | 'success' | 'maintenance';
  title: string;
  message: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  dismissible: boolean;
}

export default function SystemAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 'ann-001',
      type: 'alert',
      title: 'Condiciones Climáticas',
      message: 'Lluvia esperada 3:00-5:00 PM. Tours acuáticos pueden requerir reprogramación.',
      timestamp: '10 min ago',
      priority: 'high',
      dismissible: true
    },
    {
      id: 'ann-002',
      type: 'info',
      title: 'Nuevo Partner Activo',
      message: 'Zip-line Canopy Adventures ahora disponible para reservas directas.',
      timestamp: '2 hours ago',
      priority: 'medium',
      dismissible: true
    },
    {
      id: 'ann-003',
      type: 'maintenance',
      title: 'Mantenimiento Programado',
      message: 'Sistema de reservas offline 2:00-2:30 AM para actualizaciones.',
      timestamp: '1 day ago',
      priority: 'low',
      dismissible: true
    }
  ]);

  const dismissAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id));
  };

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'maintenance': return <Clock className="w-5 h-5 text-orange-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getAnnouncementStyle = (type: string, priority: string) => {
    const baseStyle = "border-l-4 ";
    
    switch (type) {
      case 'alert':
        return baseStyle + "border-red-500 bg-red-50";
      case 'info':
        return baseStyle + "border-blue-500 bg-blue-50";
      case 'success':
        return baseStyle + "border-green-500 bg-green-50";
      case 'maintenance':
        return baseStyle + "border-orange-500 bg-orange-50";
      default:
        return baseStyle + "border-gray-500 bg-gray-50";
    }
  };

  if (announcements.length === 0) return null;

  return (
    <div className="space-y-3 mb-6">
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className={`p-4 rounded-lg ${getAnnouncementStyle(announcement.type, announcement.priority)}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              {getAnnouncementIcon(announcement.type)}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                  {announcement.priority === 'high' && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                      Urgente
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 mb-2">{announcement.message}</p>
                <span className="text-xs text-gray-500">{announcement.timestamp}</span>
              </div>
            </div>
            {announcement.dismissible && (
              <button
                onClick={() => dismissAnnouncement(announcement.id)}
                className="p-1 hover:bg-white/50 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}