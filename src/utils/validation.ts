import { dateFormat } from 'src/consts';
import { DateTime } from 'luxon';
import { i18n as i18nInstance } from 'src/boot/i18n';
import { isNullOrUndefined } from './is-null-or-undefined';
import type { Money } from './types';
import type { ValidationRule } from 'quasar';

type NotRequired<T> = T | null | undefined;
type ValidationRequiredParam = NotRequired<boolean | string | number | object | unknown[]>;

const i18n = i18nInstance.global;

function required(): ValidationRule {
  return (value: ValidationRequiredParam): true | string => {
    if (isNullOrUndefined(value)) {
      return i18n.t('validation.required.short');
    }

    if (Array.isArray(value)) {
      if (value.length > 0) {
        return true;
      }

      return i18n.t('validation.required.short');
    }

    if (typeof value === 'string') {
      if (value.trim().length > 0) {
        return true;
      }

      return i18n.t('validation.required.short');
    }

    const truthyTypes = ['boolean', 'number', 'object'];

    if (truthyTypes.includes(typeof value)) {
      return true;
    }

    return i18n.t('validation.required.short');
  };
}

function length(min: number, max: number): ValidationRule {
  return (value: NotRequired<string>): true | string => {
    if (isNullOrUndefined(value)) {
      return true;
    }

    if (value.trim().length < min || value.length > max) {
      return i18n.t('validation.length.short', { min, max });
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
      return i18n.t('validation.maxLength.short', { max: options?.customMaxText ?? max });
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
      return i18n.t('validation.minLength.short', { min: options?.customMinText ?? min });
    }

    return true;
  };
}

function minDate(min: NotRequired<DateTime>, options?: { customMinText?: string }): ValidationRule {
  return (value: NotRequired<string>): true | string => {
    if (isNullOrUndefined(value) || isNullOrUndefined(min)) {
      return true;
    }

    const dateTimeValue = DateTime.fromFormat(value, dateFormat);
    if (dateTimeValue < min) {
      return i18n.t('validation.minDate.short', {
        min: options?.customMinText ?? i18n.d(min.toJSDate(), 'short'),
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

    const dateTimeValue = DateTime.fromFormat(value, dateFormat);
    if (dateTimeValue > max) {
      return i18n.t('validation.maxDate.short', {
        max: options?.customMaxText ?? i18n.d(max.toJSDate(), 'short'),
      });
    }

    return true;
  };
}

function minNumber(min: NotRequired<number>, options?: { customMinText?: string }): ValidationRule {
  return (value: NotRequired<number>): true | string => {
    if (isNullOrUndefined(value) || isNullOrUndefined(min)) {
      return true;
    }

    if (value < min) {
      return i18n.t('validation.minNumber.short', { min: options?.customMinText ?? i18n.n(min) });
    }

    return true;
  };
}

function maxNumber(max: NotRequired<number>, options?: { customMaxText?: string }): ValidationRule {
  return (value: NotRequired<number>): true | string => {
    if (isNullOrUndefined(value) || isNullOrUndefined(max)) {
      return true;
    }

    if (value > max) {
      return i18n.t('validation.maxNumber.short', { max: options?.customMaxText ?? i18n.n(max) });
    }

    return true;
  };
}

function minMoney(min: NotRequired<Money>, options?: { customMinText?: string }): ValidationRule {
  return (value: NotRequired<string>): true | string => {
    if (isNullOrUndefined(value) || isNullOrUndefined(min)) {
      return true;
    }

    const numericValue = Number.parseInt(value.replaceAll('.', '').replaceAll(',', ''));

    if (numericValue < min.valueInCents) {
      return i18n.t('validation.minNumber.short', {
        min: options?.customMinText ?? i18n.n(min.decimalValue, 'currency'),
      });
    }

    return true;
  };
}

function maxMoney(max: NotRequired<Money>, options?: { customMaxText?: string }): ValidationRule {
  return (value: NotRequired<string>): true | string => {
    if (isNullOrUndefined(value) || isNullOrUndefined(max)) {
      return true;
    }

    const numericValue = Number.parseInt(value.replaceAll('.', '').replaceAll(',', ''));

    if (numericValue > max.valueInCents) {
      return i18n.t('validation.maxMoney.short', {
        max: options?.customMaxText ?? i18n.n(max.decimalValue, 'currency'),
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
  minNumber,
  maxNumber,
  minMoney,
  maxMoney,
};

export { validation };
export type { ValidationRule };
