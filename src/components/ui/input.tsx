// components/ui/input.tsx  
import React from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'resort';
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  variant = 'default',
  className, 
  ...props 
}) => {
  const variants = {
    default: 'w-full px-4 py-3 border-2 border-diria-cream-dark rounded-lg focus:ring-2 focus:ring-diria-teal focus:border-diria-teal transition-all duration-200 input-premium',
    resort: 'w-full px-4 py-3 border-2 border-diria-cream-dark rounded-lg focus:ring-2 focus:ring-diria-gold focus:border-diria-gold transition-all duration-200 input-premium bg-diria-cream-light'
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-diria-brown-dark">
          {label}
        </label>
      )}
      <input
        className={cn(
          variants[variant],
          error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};