import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import { FoodBeverage, FoodBeverageQueryParams } from "./types";
import { foodBeverageKeys, apiEndpoints } from "./keys";

export const useGetFoodBeverages = (params?: FoodBeverageQueryParams) => {
  return useQuery({
    queryKey: [...foodBeverageKeys.list(), params],
    queryFn: async (): Promise<FoodBeverage[]> => {
      const response = await api.get<ApiResponse<{ data: FoodBeverage[]; pagination: any }>>(
        apiEndpoints.foodBeverage.getAll,
        { params }
      );
      return response.data.data.data;
    },
  });
};

export const useGetFoodBeverage = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: foodBeverageKeys.detail(id),
    queryFn: async (): Promise<FoodBeverage> => {
      const response = await api.get<ApiResponse<FoodBeverage>>(
        apiEndpoints.foodBeverage.getById(id)
      );
      return response.data.data;
    },
    enabled: enabled && !!id,
  });
};
