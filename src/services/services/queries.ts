import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { serviceKeys, apiEndpoints } from "./keys";
import { Service } from "./types";
import { ApiResponse } from "@/lib/types/api";

export const useGetServices = (params?: { categoryId?: string; tenantId?: string }) => {
  return useQuery({
    queryKey: [...serviceKeys.list(), params],
    queryFn: async (): Promise<Service[]> => {
      const response = await api.get<ApiResponse<Service[]>>(
        apiEndpoints.service.getAll,
        { params }
      );
      return response.data.data;
    },
  });
};

export const useGetService = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: serviceKeys.detail(id),
    queryFn: async (): Promise<Service> => {
      const response = await api.get<ApiResponse<Service>>(
        apiEndpoints.service.getById(id)
      );
      return response.data.data;
    },
    enabled: enabled && !!id,
  });
};
