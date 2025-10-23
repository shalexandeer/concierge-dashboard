import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import { FoodBeverageCategory, CreateFoodBeverageCategoryPayload, UpdateFoodBeverageCategoryPayload } from "./types";
import { foodBeverageCategoryKeys, apiEndpoints } from "./keys";

export const useCreateFoodBeverageCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payload: CreateFoodBeverageCategoryPayload): Promise<FoodBeverageCategory> => {
      const response = await api.post<ApiResponse<FoodBeverageCategory>>(
        apiEndpoints.foodBeverageCategory.create,
        payload
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foodBeverageCategoryKeys.list() });
    },
  });
};

export const useUpdateFoodBeverageCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateFoodBeverageCategoryPayload }): Promise<FoodBeverageCategory> => {
      const response = await api.put<ApiResponse<FoodBeverageCategory>>(
        apiEndpoints.foodBeverageCategory.update(id),
        payload
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: foodBeverageCategoryKeys.list() });
      queryClient.invalidateQueries({ queryKey: foodBeverageCategoryKeys.detail(variables.id) });
    },
  });
};

export const useDeleteFoodBeverageCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(apiEndpoints.foodBeverageCategory.delete(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foodBeverageCategoryKeys.list() });
    },
  });
};
