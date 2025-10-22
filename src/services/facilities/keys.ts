const API_ROUTE = "facilities";

export const facilityKeys = {
  all: ["facilities"] as const,
  list: () => [...facilityKeys.all, "list"] as const,
  detail: (id: string) => [...facilityKeys.all, "detail", id] as const,
  tenant: (tenantId: string) => [...facilityKeys.all, "tenant", tenantId] as const,
};

export const bookingKeys = {
  all: ["bookings"] as const,
  facility: (facilityId: string) => [...bookingKeys.all, "facility", facilityId] as const,
  facilityHistory: (facilityId: string) => [...bookingKeys.all, "facility", facilityId, "history"] as const,
  facilityUpcoming: (facilityId: string) => [...bookingKeys.all, "facility", facilityId, "upcoming"] as const,
  tenant: (tenantId: string) => [...bookingKeys.all, "tenant", tenantId] as const,
};

export const apiEndpoints = {
  facilities: {
    create: API_ROUTE,
    getAll: API_ROUTE,
    getById: (id: string) => `${API_ROUTE}/${id}`,
    update: (id: string) => `${API_ROUTE}/${id}`,
    delete: (id: string) => `${API_ROUTE}/${id}`,
    getByTenant: (tenantId: string) => `${API_ROUTE}/tenant/${tenantId}`,
  },
  bookings: {
    create: (facilityId: string) => `${API_ROUTE}/${facilityId}/bookings`,
    getByFacility: (facilityId: string) => `${API_ROUTE}/${facilityId}/bookings`,
    getUpcoming: (facilityId: string) => `${API_ROUTE}/${facilityId}/bookings/upcoming`,
    getById: (facilityId: string, bookingId: string) => `${API_ROUTE}/${facilityId}/bookings/${bookingId}`,
    delete: (facilityId: string, bookingId: string) => `${API_ROUTE}/${facilityId}/bookings/${bookingId}`,
    getByTenant: (tenantId: string) => `tenant-bookings/${tenantId}`,
  },
};
