import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import { FoodBeverage, CreateFoodBeveragePayload, UpdateFoodBeveragePayload } from "./types";
import { foodBeverageKeys, apiEndpoints } from "./keys";

export const useCreateFoodBeverage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payload: CreateFoodBeveragePayload): Promise<FoodBeverage> => {
      const response = await api.post<ApiResponse<FoodBeverage>>(
        apiEndpoints.foodBeverage.create,
        payload
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foodBeverageKeys.list() });
    },
  });
};

export const useUpdateFoodBeverage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateFoodBeveragePayload }): Promise<FoodBeverage> => {
      const response = await api.put<ApiResponse<FoodBeverage>>(
        apiEndpoints.foodBeverage.update(id),
        payload
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: foodBeverageKeys.list() });
      queryClient.invalidateQueries({ queryKey: foodBeverageKeys.detail(variables.id) });
    },
  });
};

export const useDeleteFoodBeverage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(apiEndpoints.foodBeverage.delete(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foodBeverageKeys.list() });
    },
  });
};
