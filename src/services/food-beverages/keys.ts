const API_ROUTE = "food-beverages";

export const foodBeverageKeys = {
  all: ["food-beverages"] as const,
  list: () => [...foodBeverageKeys.all, "list"] as const,
  detail: (id: string) => [...foodBeverageKeys.all, "detail", id] as const,
};

export const apiEndpoints = {
  foodBeverage: {
    create: API_ROUTE,
    getAll: API_ROUTE,
    getById: (id: string) => `${API_ROUTE}/${id}`,
    update: (id: string) => `${API_ROUTE}/${id}`,
    delete: (id: string) => `${API_ROUTE}/${id}`,
  },
};
