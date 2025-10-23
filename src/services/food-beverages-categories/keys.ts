const API_ROUTE = "food-beverages-categories";

export const foodBeverageCategoryKeys = {
  all: ["food-beverages-categories"] as const,
  list: () => [...foodBeverageCategoryKeys.all, "list"] as const,
  detail: (id: string) => [...foodBeverageCategoryKeys.all, "detail", id] as const,
};

export const apiEndpoints = {
  foodBeverageCategory: {
    create: API_ROUTE,
    getAll: API_ROUTE,
    getById: (id: string) => `${API_ROUTE}/${id}`,
    update: (id: string) => `${API_ROUTE}/${id}`,
    delete: (id: string) => `${API_ROUTE}/${id}`,
  },
};
