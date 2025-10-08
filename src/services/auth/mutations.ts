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


/**
 * Login mutation
 */
export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginPayload): Promise<TokenResponse> => {
      const response = await api.post<ApiResponse<TokenResponse>>(
        apiEndpoints.auth.login, 
        credentials
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem(storageKeys.accessToken, data.token);
      
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
  
  return () => {
    // Clear tokens from storage
    localStorage.removeItem(storageKeys.accessToken);
    localStorage.removeItem(storageKeys.user);
    
    // Reset auth-related queries
    queryClient.resetQueries({ queryKey: authKeys.all });
    
    // You could add a redirect here if needed
  };
};