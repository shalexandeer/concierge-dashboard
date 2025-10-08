import { useMutation } from "@/lib/hooks/useCustomQuery";
import api from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import { queryClient } from "@/components/templates/ReactQueryLayout";
import { amenityCategoryKeys, apiEndpoints } from "./keys";
import { AmenityCategory, CreateAmenityCategoryPayload, UpdateAmenityCategoryPayload } from "./types";

/**
 * Create amenity category mutation
 */
export const useCreateAmenityCategory = () => {
  return useMutation({
    mutationFn: async (payload: CreateAmenityCategoryPayload): Promise<AmenityCategory> => {
      const response = await api.post<ApiResponse<AmenityCategory>>(
        apiEndpoints.amenitiesCategories.create,
        payload
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: amenityCategoryKeys.list() });
    },
  });
};

/**
 * Update amenity category mutation
 */
export const useUpdateAmenityCategory = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateAmenityCategoryPayload }): Promise<AmenityCategory> => {
      const response = await api.put<ApiResponse<AmenityCategory>>(
        apiEndpoints.amenitiesCategories.update(id),
        payload
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: amenityCategoryKeys.list() });
      queryClient.invalidateQueries({ queryKey: amenityCategoryKeys.detail(variables.id) });
    },
  });
};

/**
 * Delete amenity category mutation
 */
export const useDeleteAmenityCategory = () => {
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(apiEndpoints.amenitiesCategories.delete(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: amenityCategoryKeys.list() });
    },
  });
};

