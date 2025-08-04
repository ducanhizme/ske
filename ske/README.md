# SKE - Next.js Skeleton Application

A Next.js skeleton application with client-side rendering (CSR) and modular architecture designed for scalable web applications.

## Architecture Overview

This application follows a bottom-up architecture with clear separation of concerns across multiple layers:

```
src/
├── components/
│   ├── ui/                        # Basic UI components
│   ├── common/                    # Shared components
│   └── features/                  # Business logic components
├── context/                       # Global context providers
├── services/                      # Global services
├── hooks/                         # Global custom hooks
├── utils/                         # Global utilities
├── types/                         # Global type definitions
└── styles/                        # Global styles
```

## Key Features

- **Client-Side Rendering Only**: Configured for static export with no SSR
- **Modular Component Architecture**: Organized in layers from basic UI to business features
- **TypeScript Support**: Full type safety with strict mode enabled
- **Global State Management**: Context-based state management
- **Service Layer**: Abstracted API, storage, and validation services
- **Error Boundaries**: Comprehensive error handling
- **Responsive Design**: Built with Tailwind CSS

## Component Layers

### 1. UI Components Layer (`src/components/ui/`)
Basic reusable UI components:
- **Button**: Multiple variants (primary, secondary, success, warning, error)
- **Input**: Text inputs with validation states
- **Select**: Dropdown selections
- **Card**: Content containers
- **Table**: Data tables with custom renderers

### 2. Common Components Layer (`src/components/common/`)
Shared application components:
- **Layout**: Main application layout with header, sidebar, and footer
- **Loading**: Loading states and spinners
- **ErrorBoundary**: Error handling and recovery

### 3. Features Layer (`src/components/features/`)
Business logic components organized by domain (ready for expansion)

## Global Services

### API Service (`src/services/api/`)
- RESTful API client with error handling
- Type-safe request/response handling
- Centralized API configuration

### Storage Service (`src/services/storage/`)
- Local and session storage abstractions
- JSON serialization/deserialization
- Error handling for storage operations

### Validation Service (`src/services/validation/`)
- Field-level validation rules
- Object validation
- Custom validation support

## Context Providers

### Auth Context (`src/context/AuthContext/`)
- User authentication state
- Login/logout functionality
- Protected route handling

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building

```bash
npm run build
```

Creates a static export in the `out/` directory.

### Linting

```bash
npm run lint
```

## Usage Examples

### Creating a New UI Component

```typescript
// src/components/ui/MyComponent/MyComponent.tsx
import React from 'react';
import { UIComponentProps } from '@/types';

export interface MyComponentProps extends UIComponentProps {
  title: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={`my-component ${className}`} {...props}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};
```

### Using the API Service

```typescript
import { apiService } from '@/services';

// GET request
const user = await apiService.get<User>('/api/users/1');

// POST request
const newUser = await apiService.post<User>('/api/users', userData);
```

### Using Context

```typescript
import { useAuth } from '@/context';

const MyComponent = () => {
  const { user, login, logout, isLoading } = useAuth();
  
  if (isLoading) return <Loading />;
  
  return (
    <div>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => login(credentials)}>Login</button>
      )}
    </div>
  );
};
```

## Configuration

### Next.js Configuration

The application is configured for static export:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
```

### TypeScript Configuration

Path aliases are configured for clean imports:

```json
{
  "baseUrl": "./src",
  "paths": {
    "@/*": ["./*"],
    "@/components/*": ["./components/*"],
    "@/services/*": ["./services/*"]
  }
}
```

## Best Practices

1. **Component Organization**: Keep components focused and single-responsibility
2. **Type Safety**: Use TypeScript interfaces for all props and data structures
3. **Error Handling**: Wrap components in ErrorBoundary where appropriate
4. **Performance**: Use React.memo and useMemo for expensive operations
5. **Testing**: Write unit tests for utilities and components
6. **Accessibility**: Follow WCAG guidelines for UI components

## Contributing

1. Follow the established folder structure
2. Add type definitions for new interfaces
3. Include error handling in services
4. Write tests for new functionality
5. Update documentation for new features

## License

This project is licensed under the MIT License.
