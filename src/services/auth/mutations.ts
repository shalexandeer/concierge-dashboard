import { authKeys, apiEndpoints, storageKeys } from './keys';
import { 
  TokenResponse, 
  LoginPayload, 
  RegisterPayload,
  User
} from './types';
import { ApiResponse } from '@/lib/types/api';
import api from '@/lib/axios';
import { queryClient } from '@/components/templates/ReactQueryLayout';
import { useMutation } from '@/lib/hooks/useCustomQuery';
import { useQueryClient } from '@tanstack/react-query';
import useAuthStore from '@/lib/store/useAuthStore';


/**
 * Login mutation
 */
export const useLogin = () => {
  const { login } = useAuthStore();
  
  return useMutation({
    mutationFn: async (credentials: LoginPayload): Promise<{token: string, user: User}> => {
      const response = await api.post<ApiResponse<{token: string, user: User}>>(
        apiEndpoints.auth.login, 
        credentials
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      // Check if user has allowed role (only tenant_admin and super_admin)
      const allowedRoles = ['tenant_admin', 'super_admin'];
      if (!data.user.role || !allowedRoles.includes(data.user.role.name)) {
        // User doesn't have required role - don't allow login
        console.log('Login denied - insufficient role:', data.user.role?.name);
        localStorage.removeItem(storageKeys.accessToken);
        throw new Error('Access denied. Insufficient permissions.');
      }
      
      // Store token in localStorage
      localStorage.setItem(storageKeys.accessToken, data.token);
      
      // Update auth store with user data
      login(data.user);
      
      // Invalidate relevant queries to refetch them with the new token
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
  });
};

/**
 * Register mutation
 */
export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: RegisterPayload): Promise<User> => {
      const response = await api.post<ApiResponse<User>>(
        apiEndpoints.auth.register, 
        payload
      );
      return response.data.data;
    },
  });
};

/**
 * Logout function
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();
  
  return () => {
    // Clear tokens from storage
    localStorage.removeItem(storageKeys.accessToken);
    localStorage.removeItem(storageKeys.user);
    
    // Update auth store
    logout();
    
    // Reset auth-related queries
    queryClient.resetQueries({ queryKey: authKeys.all });
    
    // You could add a redirect here if needed
  };
};