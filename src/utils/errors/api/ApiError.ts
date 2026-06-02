import type { ApiErrorResponse } from './ApiErrorResponse';

class ApiError extends Error {
  declare readonly __brand: symbol & { __brand: 'ApiError' };

  public readonly error: string;
  public readonly statusCode: number;
  public readonly capturedError: unknown;

  public constructor(error: string, statusCode: number, message: string, capturedError: unknown) {
    super(message);

    this.error = error;
    this.statusCode = statusCode;
    this.capturedError = capturedError;
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

  public static createUnknownError(capturedError: unknown) {
    return new ApiError('Unknown', 500, 'Unknown error', capturedError);
  }

  public static fromErrorResponse(errorResponse: ApiErrorResponse) {
    return new ApiError(
      errorResponse.error,
      errorResponse.statusCode,
      errorResponse.message,
      undefined,
    );
  }
}

export { ApiError };
