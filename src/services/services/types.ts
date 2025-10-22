export interface Service {
  id: string;
  tenantId: string;
  categoryId: string;
  serviceName: string;
  description?: string;
  operatingHoursFrom?: string;
  operatingHoursTo?: string;
  available24_7: boolean;
  responseTime?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
    description?: string;
    icon?: string;
  };
}

export interface CreateServicePayload {
  tenantId: string;
  categoryId: string;
  serviceName: string;
  description?: string;
  operatingHoursFrom?: string;
  operatingHoursTo?: string;
  available24_7?: boolean;
  responseTime?: number;
  isActive?: boolean;
}

export interface UpdateServicePayload {
  categoryId?: string;
  serviceName?: string;
  description?: string;
  operatingHoursFrom?: string;
  operatingHoursTo?: string;
  available24_7?: boolean;
  responseTime?: number;
  isActive?: boolean;
}
