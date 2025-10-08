import { useQuery } from "@/lib/hooks/useCustomQuery";
import api from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import { userTenantKeys, apiEndpoints } from "./keys";
import { Tenant } from "../tenants/types";
import { User } from "../users/types";

/**
 * Get all tenants for a user
 */
export const useGetUserTenants = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: userTenantKeys.userTenants(userId),
    queryFn: async (): Promise<Tenant[]> => {
      const response = await api.get<ApiResponse<Tenant[]>>(
        apiEndpoints.userTenants.getUserTenants(userId)
      );
      return response.data.data;
    },
    enabled: enabled && !!userId,
  });
};

/**
 * Get all users for a tenant
 */
export const useGetTenantUsers = (tenantId: string, enabled = true) => {
  return useQuery({
    queryKey: userTenantKeys.tenantUsers(tenantId),
    queryFn: async (): Promise<User[]> => {
      const response = await api.get<ApiResponse<User[]>>(
        apiEndpoints.userTenants.getTenantUsers(tenantId)
      );
      return response.data.data;
    },
    enabled: enabled && !!tenantId,
  });
};

