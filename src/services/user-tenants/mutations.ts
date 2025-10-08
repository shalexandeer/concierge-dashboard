import { useMutation } from "@/lib/hooks/useCustomQuery";
import api from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import { queryClient } from "@/components/templates/ReactQueryLayout";
import { userTenantKeys, apiEndpoints } from "./keys";
import { AddUserToTenantPayload } from "./types";

/**
 * Add user to tenant mutation
 */
export const useAddUserToTenant = () => {
  return useMutation({
    mutationFn: async (payload: AddUserToTenantPayload): Promise<void> => {
      await api.post<ApiResponse<void>>(
        apiEndpoints.userTenants.add,
        payload
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: userTenantKeys.userTenants(variables.userId) 
      });
      queryClient.invalidateQueries({ 
        queryKey: userTenantKeys.tenantUsers(variables.tenantId) 
      });
    },
  });
};

/**
 * Remove user from tenant mutation
 */
export const useRemoveUserFromTenant = () => {
  return useMutation({
    mutationFn: async ({ userId, tenantId }: { userId: string; tenantId: string }): Promise<void> => {
      await api.delete(apiEndpoints.userTenants.remove(userId, tenantId));
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: userTenantKeys.userTenants(variables.userId) 
      });
      queryClient.invalidateQueries({ 
        queryKey: userTenantKeys.tenantUsers(variables.tenantId) 
      });
    },
  });
};

