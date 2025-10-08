// lib/mockApi.ts
import { ApiResponse } from "@/lib/types/api";
import { Role, User } from "@/lib/types/auth";

// Mock user data
const mockUsers = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Petugas TPS1",
    email: "petugas",
    password: "petugas",
    role: "petugas-tps",
    role_id: "123e4567-e89b-12d3-a456-426614174000"
  },
  {
    id: "223e4567-e89b-12d3-a456-426614174001",
    name: "Admin User",
    email: "admin",
    password: "admin",
    role: "superadmin",
    role_id: "223e4567-e89b-12d3-a456-426614174001"
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174002",
    name: "Regular User",
    email: "user@example.com",
    password: "user123",
    role: "petugas-tps",
    role_id: "123e4567-e89b-12d3-a456-426614174000"
  }
];

/**
 * Mock function to simulate login process
 * @param email User email
 * @param password User password
 * @returns Promise with ApiResponse<User> on success or ApiError on failure
 */
export const mockLogin = async (
  email: string, 
  password: string
): Promise<ApiResponse<User>> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find user by email
  const user = mockUsers.find(user => user.email === email);
  
  // Check if user exists and password matches
  if (!user || user.password !== password) {
    throw new Error("Invalid email or password");
  }
  
  // Generate a mock token
  const token = btoa(`${user.id}:${user.email}:${Date.now()}`);
  
  // Return the user with token
  return {
    status: "success",
    status_code: 200,
    message: "Login successful",
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as Role,
      role_id: user.role_id,
      phone_number: "081234567890",
      username: user.email,
      token
    }
  };
};

/**
 * Mock function to validate token and get user data
 * @param token User token
 * @returns Promise with ApiResponse<User> on success or ApiError on failure
 */
export const mockGetMe = async (token: string): Promise<ApiResponse<User>> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    // In a real app, you'd validate the token on the server
    // Here we're just extracting the user ID from our mock token
    const [userId] = atob(token).split(':');
    
    const user = mockUsers.find(user => user.id === userId);
    
    if (!user) {
      throw new Error("Invalid token");
    }
    
    return {
      status: "success",
      message: "User data retrieved",
      success: true,
      status_code: 200,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as Role,
        role_id: user.role_id,
        phone_number: "081234567890",
        username: user.email,
        token
      }
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    throw new Error("Invalid token");
  }
};