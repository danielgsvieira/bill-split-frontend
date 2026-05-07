import { i18n as i18nInstance } from 'src/boot/i18n';
import { useToast } from './useToast';
import type { ApiValidationError, ApiValidationErrorData, ApiValidationErrorRule } from 'src/utils';

function useValidationToast(fieldLabels: Record<string, string>) {
  const i18n = i18nInstance.global;
  const toast = useToast();

  function getValidationErrorMessage(fieldName: string, fieldError: ApiValidationErrorRule) {
    let errorMessage: string;
    switch (fieldError[0]) {
      case 'required':
        errorMessage = i18n.t('validation.required.long', { fieldName: fieldLabels[fieldName] });
        break;
      case 'length':
        errorMessage = i18n.t('validation.length.long', {
          fieldName,
          min: fieldError[1],
          max: fieldError[2],
        });
        break;
      case 'maxLength':
        errorMessage = i18n.t('validation.maxLength.long', {
          fieldName: fieldLabels[fieldName],
          max: fieldError[1],
        });
        break;
      case 'minLength':
        errorMessage = i18n.t('validation.minLength.long', {
          fieldName: fieldLabels[fieldName],
          min: fieldError[1],
        });
        break;
      default:
        errorMessage = i18n.t('validation.defaultMessage.long');
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
