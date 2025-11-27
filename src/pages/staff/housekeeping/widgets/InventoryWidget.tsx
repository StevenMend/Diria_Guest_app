// src/pages/staff/housekeeping/widgets/InventoryWidget.tsx
import React from 'react';

interface InventoryWidgetProps {
  onQuickRequest: (item: string) => void;
}

export const InventoryWidget: React.FC<InventoryWidgetProps> = ({ onQuickRequest }) => {
  const quickItems = [
    { icon: '🧴', label: 'Towels', count: 24 },
    { icon: '🛏️', label: 'Pillows', count: 18 },
    { icon: '🧺', label: 'Blankets', count: 12 },
    { icon: '🧼', label: 'Soap', count: 45 },
    { icon: '🚿', label: 'Shampoo', count: 30 },
    { icon: '📄', label: 'Tissue', count: 60 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
      <h3 className="font-semibold mb-4 text-gray-900">
        📦 Quick Inventory Requests
      </h3>
      
      <div className="grid grid-cols-2 gap-2">
        {quickItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onQuickRequest(item.label)}
            className="flex flex-col items-center justify-center p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-all group"
          >
            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="text-xs font-medium text-green-700">{item.label}</span>
            <span className="text-xs text-green-600">Stock: {item.count}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-all">
          + Custom Request
        </button>
      </div>
    </div>
  );
};