function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDay(), 0, 0, 0, 0);
}

function endOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDay(), 23, 59, 59, 999);
}

/**
 * Create a Date object from a date string with the 'dd/MM/yyyy' format
 */
function dateFromString(value: string) {
  const [day, month, year] = value.split('/').map(Number) as [number, number, number];

  return new Date(year, month - 1, day);
}

export { dateFromString, endOfDay, startOfDay };
