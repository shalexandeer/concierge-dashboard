import { useEffect } from 'react';
import { useCurrentUser } from '@/services/auth/queries';
import useAuthStore from '@/lib/store/useAuthStore';
import { storageKeys } from '@/services/auth/keys';
import { useLocation } from 'react-router-dom';

/**
 * Hook to initialize authentication state on app startup
 */
export const useAuthInit = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/forgot-password' || location.pathname === '/reset-password';
  
  const { data: user, isLoading: userLoading, error } = useCurrentUser();
  const { login, logout, stopLoading } = useAuthStore();

  useEffect(() => {
    // Skip auth initialization on auth routes
    if (isAuthRoute) {
      stopLoading();
      return;
    }

    const token = localStorage.getItem(storageKeys.accessToken);
    
    if (!token) {
      // No token - user is not authenticated
      logout();
      stopLoading();
      return;
    }

    if (userLoading) {
      return; // Still loading user data
    }

    if (error || !user) {
      // No user or error - user is not authenticated
      logout();
      stopLoading();
      return;
    }

    // Check if user has allowed role (only tenant_admin and super_admin)
    const allowedRoles = ['tenant_admin', 'super_admin'];
    if (!user.role || !allowedRoles.includes(user.role.name)) {
      // User doesn't have required role - force logout
      console.log('User role not authorized:', user.role?.name);
      logout();
      stopLoading();
      return;
    }

    // User is authenticated and has required role - update store
    login(user);
    stopLoading();
  }, [user, userLoading, error, login, logout, stopLoading, isAuthRoute]);

  const token = localStorage.getItem(storageKeys.accessToken);
  return { isLoading: !isAuthRoute && !!token && userLoading };
};
