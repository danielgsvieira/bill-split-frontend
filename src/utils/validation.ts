import { AppDateFormat } from 'src/consts';
import { DateTime } from 'luxon';
import { i18n } from 'src/boot/i18n';
import type { ValidationRule } from 'quasar';

type NotRequired<T> = T | null | undefined;
type ValidationRequiredParam = NotRequired<boolean | string | number | object | unknown[]>;

const { t } = i18n.global;

function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

function required(): ValidationRule {
  return (value: ValidationRequiredParam): true | string => {
    if (isNullOrUndefined(value)) {
      return t('validation.required.short');
    }

    if (Array.isArray(value)) {
      if (value.length > 0) {
        return true;
      }

      return t('validation.required.short');
    }

    if (typeof value === 'string') {
      if (value.trim().length > 0) {
        return true;
      }

      return t('validation.required.short');
    }

    const truthyTypes = ['boolean', 'number', 'object'];

    if (truthyTypes.includes(typeof value)) {
      return true;
    }

    return t('validation.required.short');
  };
}

function length(min: number, max: number): ValidationRule {
  return (value: NotRequired<string>): true | string => {
    if (isNullOrUndefined(value)) {
      return true;
    }

    if (value.trim().length < min || value.length > max) {
      return t('validation.length.short', { min, max });
    }

    return true;
  };
}

function maxLength(max: number, options?: { customMaxText?: string }): ValidationRule {
  return (value: NotRequired<string>): true | string => {
    if (isNullOrUndefined(value)) {
      return true;
    }

    if (value.length > max) {
      return t('validation.maxLength.short', { max: options?.customMaxText ?? max });
    }

    return true;
  };
}

function minLength(min: number, options?: { customMinText?: string }): ValidationRule {
  return (value: NotRequired<string>): true | string => {
    if (isNullOrUndefined(value) || value.length < 0) {
      return true;
    }

    if (value.trim().length < min) {
      return t('validation.minLength.short', { min: options?.customMinText ?? min });
    }

    return true;
  };
}

function minDate(min: NotRequired<DateTime>, options?: { customMinText?: string }): ValidationRule {
  return (value: NotRequired<string>): true | string => {
    if (isNullOrUndefined(value) || isNullOrUndefined(min)) {
      return true;
    }

    const dateTimeValue = DateTime.fromFormat(value, AppDateFormat);
    if (dateTimeValue.isValid && dateTimeValue < min) {
      return t('validation.minDate.short', {
        min: options?.customMinText ?? min.toFormat(AppDateFormat),
      });
    }

    return true;
  };
}

function maxDate(max: NotRequired<DateTime>, options?: { customMaxText?: string }): ValidationRule {
  return (value: NotRequired<string>): true | string => {
    if (isNullOrUndefined(value) || isNullOrUndefined(max)) {
      return true;
    }

    const dateTimeValue = DateTime.fromFormat(value, AppDateFormat);
    if (dateTimeValue.isValid && dateTimeValue > max) {
      return t('validation.maxDate.short', {
        max: options?.customMaxText ?? max.toFormat(AppDateFormat),
      });
    }

    return true;
  };
}

const validation = {
  required,
  length,
  minLength,
  maxLength,
  minDate,
  maxDate,
};

export { validation };
export type { ValidationRule };
