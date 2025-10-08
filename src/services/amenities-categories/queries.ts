import { useQuery } from "@/lib/hooks/useCustomQuery";
import api from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import { amenityCategoryKeys, apiEndpoints } from "./keys";
import { AmenityCategory } from "./types";

/**
 * Get all amenity categories
 */
export const useGetAmenityCategories = () => {
  return useQuery({
    queryKey: amenityCategoryKeys.list(),
    queryFn: async (): Promise<AmenityCategory[]> => {
      const response = await api.get<ApiResponse<AmenityCategory[]>>(
        apiEndpoints.amenitiesCategories.getAll
      );
      return response.data.data;
    },
  });
};

/**
 * Get amenity category by ID
 */
export const useGetAmenityCategory = (id: string, enabled = true) => {
  return useQuery({
    queryKey: amenityCategoryKeys.detail(id),
    queryFn: async (): Promise<AmenityCategory> => {
      const response = await api.get<ApiResponse<AmenityCategory>>(
        apiEndpoints.amenitiesCategories.getById(id)
      );
      return response.data.data;
    },
    enabled: enabled && !!id,
  });
};

