import React from 'react';
import { UIComponentProps } from '@/types';

export interface CardProps extends UIComponentProps {
  title?: string;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  footer,
  ...props
}) => {
  const baseClasses = "rounded-lg border bg-card text-card-foreground shadow-sm";
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <div className={combinedClasses} {...props}>
      {title && (
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>
        </div>
      )}
      <div className={title ? "p-6 pt-0" : "p-6"}>
        {children}
      </div>
      {footer && (
        <div className="flex items-center p-6 pt-0">
          {footer}
        </div>
      )}
    </div>
  );
};