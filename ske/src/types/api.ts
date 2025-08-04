// API related types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: Date;
}

export interface ApiError extends AppError {
  status: number;
  endpoint: string;
}

export interface ValidationError extends AppError {
  field: string;
  value: unknown;
}