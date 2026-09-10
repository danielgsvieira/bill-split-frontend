type AppTableColumnAlignment = 'center' | 'left' | 'right';

type AppTableColumn<T> = {
  align: 'center' | 'left' | 'right';
  field: string;
  gridColClass?: string;
  label: string;
  name: string;
  format?: (value: never, row: T) => string;
};

type AppTableColumns<T> = AppTableColumn<T>[];

export type { AppTableColumns, AppTableColumnAlignment };
