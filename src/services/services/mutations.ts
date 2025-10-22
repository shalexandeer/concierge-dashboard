import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { serviceKeys, apiEndpoints } from "./keys";
import { Service, CreateServicePayload, UpdateServicePayload } from "./types";
import { ApiResponse } from "@/lib/types/api";
import { toast } from "@/lib/hooks/use-toast";

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateServicePayload): Promise<Service> => {
      const response = await api.post<ApiResponse<Service>>(
        apiEndpoints.service.create,
        payload
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.list() });
      toast({
        title: "Success",
        description: "Service created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create service",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateServicePayload }): Promise<Service> => {
      const response = await api.put<ApiResponse<Service>>(
        apiEndpoints.service.update(id),
        payload
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.list() });
      queryClient.invalidateQueries({ queryKey: serviceKeys.detail(variables.id) });
      toast({
        title: "Success",
        description: "Service updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update service",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(apiEndpoints.service.delete(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.list() });
      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete service",
        variant: "destructive",
      });
    },
  });
};
