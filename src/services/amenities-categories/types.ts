// Amenity Category types
export interface AmenityCategory {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Amenity Category request payloads
export interface CreateAmenityCategoryPayload {
  tenantId: string;
  name: string;
  description?: string;
}

export interface UpdateAmenityCategoryPayload {
  name?: string;
  description?: string;
}

