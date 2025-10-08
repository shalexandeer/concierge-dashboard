import { useMutation } from "@/lib/hooks/useCustomQuery";
import api from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import { queryClient } from "@/components/templates/ReactQueryLayout";
import { amenityKeys, apiEndpoints } from "./keys";
import { CreateAmenityPayload, Amenity, UpdateAmenityPayload, UpdateStockPayload } from "./types";

/**
 * Create amenity mutation
 */
export const useCreateAmenity = () => {
  return useMutation({
    mutationFn: async (payload: CreateAmenityPayload): Promise<Amenity> => {
      const response = await api.post<ApiResponse<Amenity>>(
        apiEndpoints.amenities.create,
        payload
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: amenityKeys.list() });
    },
  });
};

/**
 * Update amenity mutation
 */
export const useUpdateAmenity = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateAmenityPayload }): Promise<Amenity> => {
      const response = await api.put<ApiResponse<Amenity>>(
        apiEndpoints.amenities.update(id),
        payload
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: amenityKeys.list() });
      queryClient.invalidateQueries({ queryKey: amenityKeys.detail(variables.id) });
    },
  });
};

/**
 * Update amenity stock mutation
 */
export const useUpdateAmenityStock = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateStockPayload }): Promise<Amenity> => {
      const response = await api.patch<ApiResponse<Amenity>>(
        `${apiEndpoints.amenities.updateStock(id)}?quantity=${payload.quantity}`
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: amenityKeys.list() });
      queryClient.invalidateQueries({ queryKey: amenityKeys.detail(variables.id) });
    },
  });
};

/**
 * Delete amenity mutation
 */
export const useDeleteAmenity = () => {
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(apiEndpoints.amenities.delete(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: amenityKeys.list() });
    },
  });
};

