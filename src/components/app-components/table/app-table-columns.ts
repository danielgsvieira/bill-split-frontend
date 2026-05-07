type AppTableColumn<R, F extends keyof R> = {
  align: 'center' | 'left' | 'right';
  field: F;
  label: string;
  name: string;
  format?: (value: R[F], row: R) => string;
};

type AppTableColumns<R> = {
  [K in keyof R]: AppTableColumn<R, K>;
}[keyof R][];

export type { AppTableColumns };
