import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '@/lib/store/useAuthStore';

interface WithRoleProps {
  allowedRoles: string[];
  children: React.ReactNode;
  fallbackPath?: string;
}

const withRole = <P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles: string[],
  fallbackPath: string = '/unauthorized'
) => {
  const WrappedComponent = (props: P) => {
    const { hasRole, isAuthenticated, isLoading } = useAuthStore();

    // Show loading while checking authentication
    if (isLoading) {
      return <div>Loading...</div>;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    // Check if user has one of the allowed roles
    const hasAllowedRole = allowedRoles.some(role => hasRole(role));

    if (!hasAllowedRole) {
      return <Navigate to={fallbackPath} replace />;
    }

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withRole(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

// Convenience HOCs for specific roles
export const withSuperAdmin = <P extends object>(Component: React.ComponentType<P>) =>
  withRole(Component, ['super_admin']);

export const withTenantAdmin = <P extends object>(Component: React.ComponentType<P>) =>
  withRole(Component, ['super_admin', 'tenant_admin']);

export const withUser = <P extends object>(Component: React.ComponentType<P>) =>
  withRole(Component, ['super_admin', 'tenant_admin', 'user']);

// Role-based component wrapper
export const RoleGuard: React.FC<WithRoleProps> = ({ 
  allowedRoles, 
  children, 
  fallbackPath = '/unauthorized' 
}) => {
  const { hasRole, isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasAllowedRole = allowedRoles.some(role => hasRole(role));

  if (!hasAllowedRole) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

export default withRole;
