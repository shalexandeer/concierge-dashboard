export interface FoodBeverageCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFoodBeverageCategoryPayload {
  name: string;
  description?: string;
  icon?: string;
}

export interface UpdateFoodBeverageCategoryPayload {
  name?: string;
  description?: string;
  icon?: string;
}
