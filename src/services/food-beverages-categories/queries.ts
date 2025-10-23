import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import { FoodBeverageCategory } from "./types";
import { foodBeverageCategoryKeys, apiEndpoints } from "./keys";

export const useGetFoodBeverageCategories = () => {
  return useQuery({
    queryKey: foodBeverageCategoryKeys.list(),
    queryFn: async (): Promise<FoodBeverageCategory[]> => {
      const response = await api.get<ApiResponse<FoodBeverageCategory[]>>(
        apiEndpoints.foodBeverageCategory.getAll
      );
      return response.data.data;
    },
  });
};

export const useGetFoodBeverageCategory = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: foodBeverageCategoryKeys.detail(id),
    queryFn: async (): Promise<FoodBeverageCategory> => {
      const response = await api.get<ApiResponse<FoodBeverageCategory>>(
        apiEndpoints.foodBeverageCategory.getById(id)
      );
      return response.data.data;
    },
    enabled: enabled && !!id,
  });
};
