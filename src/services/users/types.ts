// User types
export interface User {
  id: string;
  email: string;
  fullName?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
}

// User request payloads
export interface CreateUserPayload {
  email: string;
  password: string;
  fullName?: string;
  phoneNumber?: string;
}

export interface UpdateUserPayload {
  email?: string;
  fullName?: string;
  phoneNumber?: string;
}

export interface UpdateCurrentUserPayload {
  fullName?: string;
  phoneNumber?: string;
}

