const API_ROUTE = "services-categories";

export const serviceCategoryKeys = {
  all: ["services-categories"] as const,
  list: () => [...serviceCategoryKeys.all, "list"] as const,
  detail: (id: string) => [...serviceCategoryKeys.all, "detail", id] as const,
};

export const apiEndpoints = {
  serviceCategory: {
    create: API_ROUTE,
    getAll: API_ROUTE,
    getById: (id: string) => `${API_ROUTE}/${id}`,
    update: (id: string) => `${API_ROUTE}/${id}`,
    delete: (id: string) => `${API_ROUTE}/${id}`,
  },
};
