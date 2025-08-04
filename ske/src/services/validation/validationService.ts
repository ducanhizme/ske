import { ValidationError } from '@/types';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  custom?: (value: unknown) => boolean | string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export class ValidationService {
  static validateField(
    field: string,
    value: unknown,
    rules: ValidationRule
  ): ValidationError | null {
    if (rules.required && (!value || value.toString().trim() === '')) {
      return {
        code: 'REQUIRED',
        message: `${field} is required`,
        field,
        value,
        timestamp: new Date(),
      };
    }

    if (value && typeof value === 'string') {
      if (rules.minLength && value.length < rules.minLength) {
        return {
          code: 'MIN_LENGTH',
          message: `${field} must be at least ${rules.minLength} characters`,
          field,
          value,
          timestamp: new Date(),
        };
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        return {
          code: 'MAX_LENGTH',
          message: `${field} must be no more than ${rules.maxLength} characters`,
          field,
          value,
          timestamp: new Date(),
        };
      }

      if (rules.email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          return {
            code: 'INVALID_EMAIL',
            message: `${field} must be a valid email address`,
            field,
            value,
            timestamp: new Date(),
          };
        }
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        return {
          code: 'PATTERN_MISMATCH',
          message: `${field} format is invalid`,
          field,
          value,
          timestamp: new Date(),
        };
      }
    }

    if (rules.custom) {
      const result = rules.custom(value);
      if (typeof result === 'string') {
        return {
          code: 'CUSTOM_VALIDATION',
          message: result,
          field,
          value,
          timestamp: new Date(),
        };
      }
      if (result === false) {
        return {
          code: 'CUSTOM_VALIDATION',
          message: `${field} is invalid`,
          field,
          value,
          timestamp: new Date(),
        };
      }
    }

    return null;
  }

  static validateObject(
    data: Record<string, unknown>,
    rules: Record<string, ValidationRule>
  ): ValidationResult {
    const errors: ValidationError[] = [];

    for (const [field, fieldRules] of Object.entries(rules)) {
      const error = this.validateField(field, data[field], fieldRules);
      if (error) {
        errors.push(error);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

export const validationService = new ValidationService();