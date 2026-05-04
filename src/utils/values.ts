import { isNullOrUndefined } from './is-null-or-undefined';

function valueOrEmptyIndicator(value: string | number | null | undefined, indicator = '-') {
  if (isNullOrUndefined(value)) {
    return indicator;
  }

  const strValue = typeof value === 'number' ? value.toLocaleString() : value;

  return strValue.length > 0 ? strValue : indicator;
}

export { valueOrEmptyIndicator };
