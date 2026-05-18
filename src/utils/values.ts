import { i18n as i18nInstance } from 'src/boot/i18n';
import { isNullOrUndefined } from './is-null-or-undefined';

function valueOrEmptyIndicator(value: string | number | null | undefined, indicator = '-') {
  if (isNullOrUndefined(value)) {
    return indicator;
  }

  const i18n = i18nInstance.global;

  const strValue = typeof value === 'number' ? i18n.n(value) : value;

  return strValue.length > 0 ? strValue : indicator;
}

export { valueOrEmptyIndicator };
