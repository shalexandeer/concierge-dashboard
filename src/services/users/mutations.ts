import { useMutation } from "@/lib/hooks/useCustomQuery";
import api from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import { queryClient } from "@/components/templates/ReactQueryLayout";
import { userKeys, apiEndpoints } from "./keys";
import { User, CreateUserPayload, UpdateUserPayload, UpdateCurrentUserPayload } from "./types";
import { authKeys } from "../auth/keys";

/**
 * Create user mutation
 */
export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (payload: CreateUserPayload): Promise<User> => {
      const response = await api.post<ApiResponse<User>>(
        apiEndpoints.users.create,
        payload
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.list() });
    },
  });
};

/**
 * Update user mutation
 */
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateUserPayload }): Promise<User> => {
      const response = await api.put<ApiResponse<User>>(
        apiEndpoints.users.update(id),
        payload
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.list() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
    },
  });
};

/**
 * Update current user mutation
 */
export const useUpdateCurrentUser = () => {
  return useMutation({
    mutationFn: async (payload: UpdateCurrentUserPayload): Promise<User> => {
      const response = await api.put<ApiResponse<User>>(
        apiEndpoints.users.updateCurrent,
        payload
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
  });
};

/**
 * Delete user mutation
 */
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(apiEndpoints.users.delete(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.list() });
    },
  });
};

