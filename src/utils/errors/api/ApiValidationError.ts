import { ApiError } from './ApiError';
import type { ApiErrorResponse, ApiValidationErrorData } from './ApiErrorResponse';

class ApiValidationError extends ApiError {
  public readonly validationErrors: ApiValidationErrorData;

  public constructor(
    error: string,
    statusCode: number,
    message: string,
    validationErrors: ApiValidationErrorData,
  ) {
    super(error, statusCode, message, undefined);

    this.validationErrors = validationErrors;
  }

  public static override fromErrorResponse(errorResponse: ApiErrorResponse) {
    if (errorResponse.statusCode === 400 && errorResponse.validationErrors !== undefined) {
      return new ApiValidationError(
        errorResponse.error,
        errorResponse.statusCode,
        errorResponse.message,
        errorResponse.validationErrors,
      );
    }

    return new ApiError(
      errorResponse.error,
      errorResponse.statusCode,
      errorResponse.message,
      undefined,
    );
  }
}

export { ApiValidationError };
