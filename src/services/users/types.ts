// User types
export interface User {
  id: string;
  email: string;
  fullName?: string;
  phoneNumber?: string;
  roleId: string;
  role?: {
    id: string;
    name: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
}

// User request payloads
export interface CreateUserPayload {
  email: string;
  password: string;
  fullName?: string;
  phoneNumber?: string;
  roleId: string;
  tenantIds?: string[];
}

export interface UpdateUserPayload {
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  roleId?: string;
  tenantIds?: string[];
}

export interface UpdateCurrentUserPayload {
  fullName?: string;
  phoneNumber?: string;
}

