// Auth responses
export interface TokenResponse {
  token: string;
}

// Auth request payloads
export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

// Role types
export interface Role {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// User types
export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  roleId: string;
  role?: Role;
  createdAt: string;
  updatedAt: string;
}

// JWT Decoded Types
export interface JwtPayload {
  userId: string;
  username: string;
  roleId: string;
  roleName: string;
  tenantId?: string;
  exp: number;
  iat: number;
}

export interface MeResponse extends User {}

