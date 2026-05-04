type ApiValidationErrorRule =
  | ['required']
  | ['length', string, string]
  | ['maxLength', string]
  | ['minLength', string]
  | ['alreadyExisits'];

type ApiValidationErrorData = Record<string, ApiValidationErrorRule[]>;

type ApiErrorResponse = {
  error: string;
  message: string;
  statusCode: number;
  validationErrors?: ApiValidationErrorData;
};

export type { ApiErrorResponse, ApiValidationErrorData, ApiValidationErrorRule };
