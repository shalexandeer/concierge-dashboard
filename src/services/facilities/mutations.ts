import { useMutation } from "@/lib/hooks/useCustomQuery";
import api from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import { queryClient } from "@/components/templates/ReactQueryLayout";
import { facilityKeys, bookingKeys, apiEndpoints } from "./keys";
import { Facility, Booking, CreateFacilityPayload, UpdateFacilityPayload, CreateBookingPayload } from "./types";

/**
 * Create facility mutation
 */
export const useCreateFacility = () => {
  return useMutation({
    mutationFn: async (payload: CreateFacilityPayload): Promise<Facility> => {
      const response = await api.post<ApiResponse<Facility>>(
        apiEndpoints.facilities.create,
        payload
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: facilityKeys.list() });
    },
  });
};

/**
 * Update facility mutation
 */
export const useUpdateFacility = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateFacilityPayload }): Promise<Facility> => {
      const response = await api.put<ApiResponse<Facility>>(
        apiEndpoints.facilities.update(id),
        payload
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: facilityKeys.list() });
      queryClient.invalidateQueries({ queryKey: facilityKeys.detail(variables.id) });
    },
  });
};

/**
 * Delete facility mutation
 */
export const useDeleteFacility = () => {
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete<ApiResponse<void>>(
        apiEndpoints.facilities.delete(id)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: facilityKeys.list() });
    },
  });
};

/**
 * Create booking mutation
 */
export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async (payload: CreateBookingPayload): Promise<Booking> => {
      const response = await api.post<ApiResponse<Booking>>(
        apiEndpoints.bookings.create(payload.facilityId),
        payload
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: facilityKeys.detail(data.facilityId) });
      queryClient.invalidateQueries({ queryKey: bookingKeys.facility(data.facilityId) });
      queryClient.invalidateQueries({ queryKey: bookingKeys.facilityHistory(data.facilityId) });
      queryClient.invalidateQueries({ queryKey: bookingKeys.facilityUpcoming(data.facilityId) });
    },
  });
};

/**
 * Delete booking mutation
 */
export const useDeleteBooking = () => {
  return useMutation({
    mutationFn: async ({ facilityId, bookingId }: { facilityId: string; bookingId: string }): Promise<void> => {
      await api.delete<ApiResponse<void>>(
        apiEndpoints.bookings.delete(facilityId, bookingId)
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: facilityKeys.detail(variables.facilityId) });
      queryClient.invalidateQueries({ queryKey: bookingKeys.facility(variables.facilityId) });
      queryClient.invalidateQueries({ queryKey: bookingKeys.facilityHistory(variables.facilityId) });
      queryClient.invalidateQueries({ queryKey: bookingKeys.facilityUpcoming(variables.facilityId) });
    },
  });
};
