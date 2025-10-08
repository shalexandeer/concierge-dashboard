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

// User types
export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  createdAt: string;
  updatedAt: string;
}

// JWT Decoded Types
export interface JwtPayload {
  userId: string;
  exp: number;
  iat: number;
}

export interface MeResponse extends User {}

