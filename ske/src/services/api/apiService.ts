import { ApiError } from '@/types';

export interface ApiService {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: unknown): Promise<T>;
  put<T>(url: string, data: unknown): Promise<T>;
  delete<T>(url: string): Promise<T>;
}

class ApiServiceImpl implements ApiService {
  private baseURL: string;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || '/api') {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error: ApiError = {
          code: `HTTP_${response.status}`,
          message: errorData.message || response.statusText,
          status: response.status,
          endpoint: url,
          timestamp: new Date(),
        };
        throw error;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error && 'status' in error) {
        throw error; // Re-throw ApiError
      }
      
      // Handle network errors
      const apiError: ApiError = {
        code: 'NETWORK_ERROR',
        message: 'Network request failed',
        status: 0,
        endpoint: url,
        timestamp: new Date(),
        details: error,
      };
      throw apiError;
    }
  }

  async get<T>(url: string): Promise<T> {
    return this.request<T>(url, { method: 'GET' });
  }

  async post<T>(url: string, data: unknown): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(url: string, data: unknown): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(url: string): Promise<T> {
    return this.request<T>(url, { method: 'DELETE' });
  }
}

export const apiService = new ApiServiceImpl();