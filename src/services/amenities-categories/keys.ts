const API_ROUTE = "amenities-categories";

export const amenityCategoryKeys = {
  all: ["amenities-categories"] as const,
  list: () => [...amenityCategoryKeys.all, "list"] as const,
  detail: (id: string) => [...amenityCategoryKeys.all, "detail", id] as const,
};

export const apiEndpoints = {
  amenitiesCategories: {
    create: API_ROUTE,
    getAll: API_ROUTE,
    getById: (id: string) => `${API_ROUTE}/${id}`,
    update: (id: string) => `${API_ROUTE}/${id}`,
    delete: (id: string) => `${API_ROUTE}/${id}`,
  },
};

