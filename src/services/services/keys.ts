const API_ROUTE = "services";

export const serviceKeys = {
  all: ["services"] as const,
  list: () => [...serviceKeys.all, "list"] as const,
  detail: (id: string) => [...serviceKeys.all, "detail", id] as const,
};

export const apiEndpoints = {
  service: {
    create: API_ROUTE,
    getAll: API_ROUTE,
    getById: (id: string) => `${API_ROUTE}/${id}`,
    update: (id: string) => `${API_ROUTE}/${id}`,
    delete: (id: string) => `${API_ROUTE}/${id}`,
  },
};
