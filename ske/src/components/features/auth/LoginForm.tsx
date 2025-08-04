import React, { useState } from 'react';
import { Button, Input, Card } from '@/components/ui';
import { useAuth } from '@/context';
import { ValidationService } from '@/services';

export interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validation = ValidationService.validateObject(formData, {
      email: { required: true, email: true },
      password: { required: true, minLength: 6 },
    });

    if (!validation.isValid) {
      const errors: Record<string, string> = {};
      validation.errors.forEach(error => {
        errors[error.field] = error.message;
      });
      setValidationErrors(errors);
      return;
    }

    try {
      await login(formData);
      onSuccess?.();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <Card title="Login" className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email"
            error={validationErrors.email}
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Enter your password"
            error={validationErrors.password}
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Card>
  );
};