export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}