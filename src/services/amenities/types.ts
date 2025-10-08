export interface Amenity {
  id: string;
  tenantId: string;
  categoryId: string;
  itemName: string;
  description?: string;
  stock: number;
  minimumStock: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    tenantId: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CreateAmenityPayload {
  tenantId: string;
  categoryId: string;
  itemName: string;
  description?: string;
  stock?: number;
  minimumStock?: number;
  available?: boolean;
}

export interface UpdateAmenityPayload {
  categoryId?: string;
  itemName?: string;
  description?: string;
  stock?: number;
  minimumStock?: number;
  available?: boolean;
}

export interface UpdateStockPayload {
  quantity: number;
}
