export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceCategoryPayload {
  name: string;
  description?: string;
  icon?: string;
}

export interface UpdateServiceCategoryPayload {
  name?: string;
  description?: string;
  icon?: string;
}
