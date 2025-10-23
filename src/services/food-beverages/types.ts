export interface FoodBeverage {
  id: string;
  tenantId: string;
  categoryId: string;
  itemName: string;
  description?: string;
  price: number;
  preparationTime: number;
  serviceHoursStart?: string;
  serviceHoursEnd?: string;
  allDay: boolean;
  imagePath?: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
    description?: string;
    icon?: string;
  };
}

export interface CreateFoodBeveragePayload {
  tenantId: string;
  categoryId: string;
  itemName: string;
  description?: string;
  price: number;
  preparationTime: number;
  serviceHoursStart?: string;
  serviceHoursEnd?: string;
  allDay?: boolean;
  imagePath?: string;
  isAvailable?: boolean;
}

export interface UpdateFoodBeveragePayload {
  categoryId?: string;
  itemName?: string;
  description?: string;
  price?: number;
  preparationTime?: number;
  serviceHoursStart?: string;
  serviceHoursEnd?: string;
  allDay?: boolean;
  imagePath?: string;
  isAvailable?: boolean;
}

export interface FoodBeverageQueryParams {
  tenantId?: string;
  categoryId?: string;
  page?: number;
  pageSize?: number;
}
