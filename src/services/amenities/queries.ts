import { useQuery } from "@/lib/hooks/useCustomQuery";
import api from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import { amenityKeys, apiEndpoints } from "./keys";
import { Amenity } from "./types";

/**
 * Get all amenities
 */
export const useGetAmenities = () => {
  return useQuery({
    queryKey: amenityKeys.list(),
    queryFn: async (): Promise<Amenity[]> => {
      const response = await api.get<ApiResponse<Amenity[]>>(
        apiEndpoints.amenities.getAll
      );
      return response.data.data;
    },
  });
};

/**
 * Get amenity by ID
 */
export const useGetAmenity = (id: string, enabled = true) => {
  return useQuery({
    queryKey: amenityKeys.detail(id),
    queryFn: async (): Promise<Amenity> => {
      const response = await api.get<ApiResponse<Amenity>>(
        apiEndpoints.amenities.getById(id)
      );
      return response.data.data;
    },
    enabled: enabled && !!id,
  });
};

