// Tenant types
export interface Tenant {
  id: string;
  name: string;
  domain?: string;
  settings?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

// Tenant request payloads
export interface CreateTenantPayload {
  name: string;
  domain?: string;
  settings?: Record<string, unknown>;
}

export interface UpdateTenantPayload {
  name?: string;
  domain?: string;
  settings?: Record<string, unknown>;
}

