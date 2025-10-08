const API_ROUTE = "amenities";

export const amenityKeys = {
  all: ["amenities"] as const,
  list: () => [...amenityKeys.all, "list"] as const,
  detail: (id: string) => [...amenityKeys.all, "detail", id] as const,
};

export const apiEndpoints = {
  amenities: {
    create: API_ROUTE,
    getAll: API_ROUTE,
    getById: (id: string) => `${API_ROUTE}/${id}`,
    update: (id: string) => `${API_ROUTE}/${id}`,
    updateStock: (id: string) => `${API_ROUTE}/${id}/stock`,
    delete: (id: string) => `${API_ROUTE}/${id}`,
  },
};

