import { useMutation } from "@/lib/hooks/useCustomQuery";
import api from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import { queryClient } from "@/components/templates/ReactQueryLayout";
import { tenantKeys, apiEndpoints } from "./keys";
import { Tenant, CreateTenantPayload, UpdateTenantPayload } from "./types";

/**
 * Create tenant mutation
 */
export const useCreateTenant = () => {
  return useMutation({
    mutationFn: async (payload: CreateTenantPayload): Promise<Tenant> => {
      const response = await api.post<ApiResponse<Tenant>>(
        apiEndpoints.tenants.create,
        payload
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tenantKeys.list() });
    },
  });
};

/**
 * Update tenant mutation
 */
export const useUpdateTenant = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateTenantPayload }): Promise<Tenant> => {
      const response = await api.put<ApiResponse<Tenant>>(
        apiEndpoints.tenants.update(id),
        payload
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: tenantKeys.list() });
      queryClient.invalidateQueries({ queryKey: tenantKeys.detail(variables.id) });
    },
  });
};

/**
 * Delete tenant mutation
 */
export const useDeleteTenant = () => {
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(apiEndpoints.tenants.delete(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tenantKeys.list() });
    },
  });
};

