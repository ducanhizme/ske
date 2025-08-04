// Common UI component types
export interface UIComponentProps {
  className?: string;
  children?: React.ReactNode;
  variant?: string;
  size?: "small" | "medium" | "large";
}

// Component variants
export interface ComponentVariants {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
}

// Toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}