// backend/src/common/utils/response.interface.ts

export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
  errorCode?: string;
}

export function createSuccessResponse<T>(data: T): SuccessResponse<T> {
  return {
    success: true,
    data,
  };
}

export function createErrorResponse(
  message: string,
  errorCode?: string,
): ErrorResponse {
  return {
    success: false,
    message,
    errorCode,
  };
}
