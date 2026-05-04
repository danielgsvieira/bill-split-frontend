import { i18n } from 'src/boot/i18n';
import { useToast } from './useToast';
import type { ApiValidationError, ApiValidationErrorData, ApiValidationErrorRule } from 'src/utils';

function useValidationToast(fieldLabels: Record<string, string>) {
  const { t } = i18n.global;
  const toast = useToast();

  function getValidationErrorMessage(fieldName: string, fieldError: ApiValidationErrorRule) {
    let errorMessage: string;
    switch (fieldError[0]) {
      case 'required':
        errorMessage = t('validation.required.long', { fieldName: fieldLabels[fieldName] });
        break;
      case 'length':
        errorMessage = t('validation.length.long', {
          fieldName,
          min: fieldError[1],
          max: fieldError[2],
        });
        break;
      case 'maxLength':
        errorMessage = t('validation.maxLength.long', {
          fieldName: fieldLabels[fieldName],
          max: fieldError[1],
        });
        break;
      case 'minLength':
        errorMessage = t('validation.minLength.long', {
          fieldName: fieldLabels[fieldName],
          min: fieldError[1],
        });
        break;
      default:
        errorMessage = t('validation.defaultMessage.long');
    }

    return errorMessage;
  }

  function getValidationMessages(validationErrors: ApiValidationErrorData) {
    const messages: string[] = [];

    for (const [fieldName, fieldErrors] of Object.entries(validationErrors)) {
      const fieldMessages = fieldErrors.map((fieldError) =>
        getValidationErrorMessage(fieldName, fieldError),
      );
      messages.push(...fieldMessages);
    }

    return messages;
  }

  function printValidationToast(apiError: ApiValidationError) {
    const messages = getValidationMessages(apiError.validationErrors);

    messages.forEach((message) => {
      toast.negative(message);
    });
  }

  return { printValidationToast };
}

export { useValidationToast };
