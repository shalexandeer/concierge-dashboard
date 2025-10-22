import { useQuery } from "@/lib/hooks/useCustomQuery";
import api from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import { tenantKeys, apiEndpoints } from "./keys";
import { Tenant } from "./types";

/**
 * Get all tenants
 */
export const useGetTenants = (enabled: boolean) => {
  return useQuery({
    queryKey: tenantKeys.list(),
    queryFn: async (): Promise<Tenant[]> => {
      const response = await api.get<ApiResponse<Tenant[]>>(
        apiEndpoints.tenants.getAll
      );
      return response.data.data;
    },
    enabled
  });
};

/**
 * Get tenant by ID
 */
export const useGetTenant = (id: string, enabled = true) => {
  return useQuery({
    queryKey: tenantKeys.detail(id),
    queryFn: async (): Promise<Tenant> => {
      const response = await api.get<ApiResponse<Tenant>>(
        apiEndpoints.tenants.getById(id)
      );
      return response.data.data;
    },
    enabled: enabled && !!id,
  });
};

