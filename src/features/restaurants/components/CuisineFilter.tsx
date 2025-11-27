// ============================================
// CUISINE FILTER - Updated (Phase B.1)
// ============================================

import React from 'react';

interface CuisineFilterProps {
  cuisines: string[];
  selectedCuisine: string;
  onCuisineChange: (cuisine: string) => void;
}

export const CuisineFilter: React.FC<CuisineFilterProps> = ({
  cuisines,
  selectedCuisine,
  onCuisineChange,
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-diria-brown mb-4">Filter by Cuisine</h3>
      <div className="flex flex-wrap gap-3">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => onCuisineChange(cuisine)}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
              selectedCuisine === cuisine
                ? 'bg-diria-teal text-white shadow-md'
                : 'bg-white text-diria-brown border-2 border-diria-cream-dark hover:border-diria-teal'
            }`}
          >
            {cuisine}
          </button>
        ))}
      </div>
    </div>
  );
};
