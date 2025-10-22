import { useQuery } from "@/lib/hooks/useCustomQuery";
import { api } from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import { roleKeys, apiEndpoints } from "./keys";
import { Role } from "./types";

export const useGetRoles = () => {
  return useQuery({
    queryKey: roleKeys.list(),
    queryFn: async (): Promise<Role[]> => {
      const response = await api.get<ApiResponse<Role[]>>(
        apiEndpoints.roles.getAll
      );
      return response.data.data;
    },
  });
};

export const useGetRole = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: roleKeys.detail(id),
    queryFn: async (): Promise<Role> => {
      const response = await api.get<ApiResponse<Role>>(
        apiEndpoints.roles.getById(id)
      );
      return response.data.data;
    },
    enabled: enabled && !!id,
  });
};
