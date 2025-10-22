import { useQuery } from "@/lib/hooks/useCustomQuery";
import api from "@/lib/axios";
import { ApiResponse, ApiResponseWithPagination } from "@/lib/types/api";
import { facilityKeys, bookingKeys, apiEndpoints } from "./keys";
import { Facility, Booking, QueryParams } from "./types";

/**
 * Get all facilities with pagination
 */
export const useGetFacilities = (params?: QueryParams) => {
  return useQuery({
    queryKey: [...facilityKeys.list(), params],
    queryFn: async (): Promise<Facility> => {
      const response = await api.get<ApiResponseWithPagination<Facility>>(
        apiEndpoints.facilities.getAll,
        { params }
      );
      return response.data.data;
    },
  });
};

/**
 * Get facility by ID
 */
export const useGetFacility = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: facilityKeys.detail(id),
    queryFn: async (): Promise<Facility> => {
      const response = await api.get<ApiResponse<Facility>>(
        apiEndpoints.facilities.getById(id)
      );
      return response.data.data;
    },
    enabled: enabled && !!id,
  });
};

/**
 * Get facilities by tenant ID
 */
export const useGetFacilitiesByTenant = (tenantId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: facilityKeys.tenant(tenantId),
    queryFn: async (): Promise<Facility[]> => {
      const response = await api.get<ApiResponse<Facility[]>>(
        apiEndpoints.facilities.getByTenant(tenantId)
      );
      return response.data.data;
    },
    enabled: enabled && !!tenantId,
  });
};

/**
 * Get facility bookings (all history)
 */
export const useGetFacilityBookings = (facilityId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: bookingKeys.facilityHistory(facilityId),
    queryFn: async (): Promise<Booking[]> => {
      const response = await api.get<ApiResponse<Booking[]>>(
        apiEndpoints.bookings.getByFacility(facilityId)
      );
      return response.data.data;
    },
    enabled: enabled && !!facilityId,
  });
};

/**
 * Get upcoming bookings for a facility
 */
export const useGetUpcomingBookings = (facilityId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: bookingKeys.facilityUpcoming(facilityId),
    queryFn: async (): Promise<Booking[]> => {
      const response = await api.get<ApiResponse<Booking[]>>(
        apiEndpoints.bookings.getUpcoming(facilityId)
      );
      return response.data.data;
    },
    enabled: enabled && !!facilityId,
  });
};

/**
 * Get booking by ID
 */
export const useGetBooking = (facilityId: string, bookingId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [...bookingKeys.facility(facilityId), bookingId],
    queryFn: async (): Promise<Booking> => {
      const response = await api.get<ApiResponse<Booking>>(
        apiEndpoints.bookings.getById(facilityId, bookingId)
      );
      return response.data.data;
    },
    enabled: enabled && !!facilityId && !!bookingId,
  });
};

/**
 * Get bookings by tenant ID with pagination
 */
export const useGetBookingsByTenant = (tenantId: string, params?: QueryParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: [...bookingKeys.tenant(tenantId), params],
    queryFn: async (): Promise<ApiResponseWithPagination<Booking>> => {
      const response = await api.get<ApiResponseWithPagination<Booking>>(
        apiEndpoints.bookings.getByTenant(tenantId),
        { params }
      );
      return response.data;
    },
    enabled: enabled && !!tenantId,
  });
};
