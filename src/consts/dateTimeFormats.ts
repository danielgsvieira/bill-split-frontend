const dateFormat = 'dd/MM/yyyy' as const;
const timeFormat = 'HH:mm:ss' as const;
const dateTimeFormat = `${dateFormat} ${timeFormat}` as const;

export { dateFormat, dateTimeFormat, timeFormat };
