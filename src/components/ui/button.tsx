// components/ui/button.tsx
import React from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'filter';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-diria-gold text-white hover:bg-diria-gold-dark shadow-sm btn-premium',
    secondary: 'bg-diria-teal text-white hover:bg-diria-teal-dark shadow-sm btn-premium',
    outline: 'border-2 border-diria-teal text-diria-teal hover:bg-diria-teal hover:text-white',
    ghost: 'text-diria-brown hover:bg-diria-cream',
    filter: 'bg-diria-cream-light hover:bg-diria-gold hover:text-white border border-diria-cream-dark'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg'
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};