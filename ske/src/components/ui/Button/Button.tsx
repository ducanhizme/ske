import React from 'react';
import { UIComponentProps } from '@/types';

export interface ButtonProps extends UIComponentProps {
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
  size = "medium",
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const sizeClasses = {
    small: "h-8 px-3 text-sm",
    medium: "h-10 px-4 py-2",
    large: "h-12 px-6 text-lg"
  };
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-yellow-600 text-white hover:bg-yellow-700",
    error: "bg-red-600 text-white hover:bg-red-700"
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};