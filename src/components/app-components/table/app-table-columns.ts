type AppTableColumnAlignment = 'center' | 'left' | 'right';

type AppTableColumn<T> = {
  align: 'center' | 'left' | 'right';
  field: string;
  label: string;
  name: string;
  format?: (value: never, row: T) => string;
  gridColClass?: string;
};

type AppTableColumns<T> = AppTableColumn<T>[];

export type { AppTableColumns, AppTableColumnAlignment };
