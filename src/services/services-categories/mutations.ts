import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { serviceCategoryKeys, apiEndpoints } from "./keys";
import { ServiceCategory, CreateServiceCategoryPayload, UpdateServiceCategoryPayload } from "./types";
import { ApiResponse } from "@/lib/types/api";
import { toast } from "@/lib/hooks/use-toast";

export const useCreateServiceCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateServiceCategoryPayload): Promise<ServiceCategory> => {
      const response = await api.post<ApiResponse<ServiceCategory>>(
        apiEndpoints.serviceCategory.create,
        payload
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceCategoryKeys.list() });
      toast({
        title: "Success",
        description: "Service category created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create service category",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateServiceCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateServiceCategoryPayload }): Promise<ServiceCategory> => {
      const response = await api.put<ApiResponse<ServiceCategory>>(
        apiEndpoints.serviceCategory.update(id),
        payload
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: serviceCategoryKeys.list() });
      queryClient.invalidateQueries({ queryKey: serviceCategoryKeys.detail(variables.id) });
      toast({
        title: "Success",
        description: "Service category updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update service category",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteServiceCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(apiEndpoints.serviceCategory.delete(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceCategoryKeys.list() });
      toast({
        title: "Success",
        description: "Service category deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete service category",
        variant: "destructive",
      });
    },
  });
};
