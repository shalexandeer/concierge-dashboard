import { AxiosError } from "axios";

// Common API response structure
export interface ApiResponse<T> {
  status: string;
  data: T;
  success: boolean;
  status_code: number;
  message: string;
}
  
export type ApiError = AxiosError<ApiResponse<boolean>>;

export interface PaginationParams {
  page?: number;
  page_size?: number;
  total_page?: number;
  total_data?: number;
}

export interface ApiResponseWithPagination<T> extends ApiResponse<T> {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  page_size: number;
  total_page: number;
  total_data: number;
}