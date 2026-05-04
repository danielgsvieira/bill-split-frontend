function valueOrEmptyIndicator(value: string | number | null | undefined) {
  const strValue = typeof value === 'number' ? value.toLocaleString() : value;

  return strValue ?? '-';
}

export { valueOrEmptyIndicator };
