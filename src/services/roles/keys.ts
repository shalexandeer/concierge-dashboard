const API_ROUTE = "roles";

export const roleKeys = {
  all: ["roles"] as const,
  list: () => [...roleKeys.all, "list"] as const,
  detail: (id: string) => [...roleKeys.all, "detail", id] as const,
};

export const apiEndpoints = {
  roles: {
    getAll: API_ROUTE,
    getById: (id: string) => `${API_ROUTE}/${id}`,
  },
};
