import React from 'react';
import { UIComponentProps } from '@/types';

export interface InputProps extends UIComponentProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  className = '',
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  required = false,
  error,
  size = "medium",
  ...props
}) => {
  const baseClasses = "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  
  const sizeClasses = {
    small: "h-8 text-sm",
    medium: "h-10",
    large: "h-12 text-lg"
  };
  
  const errorClasses = error ? "border-red-500 focus-visible:ring-red-500" : "";
  
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${errorClasses} ${className}`;

  return (
    <div className="w-full">
      <input
        type={type}
        className={combinedClasses}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};