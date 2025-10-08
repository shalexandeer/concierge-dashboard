import { useQuery } from "@/lib/hooks/useCustomQuery";
import api from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import { userKeys, apiEndpoints } from "./keys";
import { User } from "./types";

/**
 * Get all users
 */
export const useGetUsers = () => {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: async (): Promise<User[]> => {
      const response = await api.get<ApiResponse<User[]>>(
        apiEndpoints.users.getAll
      );
      return response.data.data;
    },
  });
};

/**
 * Get user by ID
 */
export const useGetUser = (id: string, enabled = true) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async (): Promise<User> => {
      const response = await api.get<ApiResponse<User>>(
        apiEndpoints.users.getById(id)
      );
      return response.data.data;
    },
    enabled: enabled && !!id,
  });
};

