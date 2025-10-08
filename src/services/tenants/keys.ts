const API_ROUTE = "tenants";

export const tenantKeys = {
  all: ["tenants"] as const,
  list: () => [...tenantKeys.all, "list"] as const,
  detail: (id: string) => [...tenantKeys.all, "detail", id] as const,
};

export const apiEndpoints = {
  tenants: {
    create: API_ROUTE,
    getAll: API_ROUTE,
    getById: (id: string) => `${API_ROUTE}/${id}`,
    update: (id: string) => `${API_ROUTE}/${id}`,
    delete: (id: string) => `${API_ROUTE}/${id}`,
  },
};

