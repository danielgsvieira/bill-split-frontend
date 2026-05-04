import type { ApiErrorResponse } from './ApiErrorResponse';

class ApiError extends Error {
  public readonly error: string;
  public readonly statusCode: number;

  public constructor(error: string, statusCode: number, message: string) {
    super(message);

    this.error = error;
    this.statusCode = statusCode;
  }

  public get isUnauthorized() {
    return this.statusCode === 401;
  }

  public get isForbiddenAction() {
    return this.statusCode === 403;
  }

  public get isNotFound() {
    return this.statusCode === 404;
  }

  public get isUnknownError() {
    return this.error === 'Unknown' && this.statusCode === 500;
  }

  public static createUnknownError() {
    return new ApiError('Unknown', 500, 'Unknown error');
  }

  public static fromErrorResponse(errorResponse: ApiErrorResponse) {
    return new ApiError(errorResponse.error, errorResponse.statusCode, errorResponse.message);
  }
}

export { ApiError };
