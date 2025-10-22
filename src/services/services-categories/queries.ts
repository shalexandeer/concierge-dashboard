import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { serviceCategoryKeys, apiEndpoints } from "./keys";
import { ServiceCategory } from "./types";
import { ApiResponse } from "@/lib/types/api";

export const useGetServiceCategories = () => {
  return useQuery({
    queryKey: serviceCategoryKeys.list(),
    queryFn: async (): Promise<ServiceCategory[]> => {
      const response = await api.get<ApiResponse<ServiceCategory[]>>(
        apiEndpoints.serviceCategory.getAll
      );
      return response.data.data;
    },
  });
};

export const useGetServiceCategory = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: serviceCategoryKeys.detail(id),
    queryFn: async (): Promise<ServiceCategory> => {
      const response = await api.get<ApiResponse<ServiceCategory>>(
        apiEndpoints.serviceCategory.getById(id)
      );
      return response.data.data;
    },
    enabled: enabled && !!id,
  });
};
