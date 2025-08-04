import React from 'react';
import { UIComponentProps } from '@/types';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends UIComponentProps {
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  className = '',
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  error,
  size = "medium",
  ...props
}) => {
  const baseClasses = "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  
  const sizeClasses = {
    small: "h-8 text-sm",
    medium: "h-10",
    large: "h-12 text-lg"
  };
  
  const errorClasses = error ? "border-red-500 focus-visible:ring-red-500" : "";
  
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${errorClasses} ${className}`;

  return (
    <div className="w-full">
      <select
        className={combinedClasses}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};