type EditExpenseCycleRequest = {
  title: string;
  description: string | null;
  sharedWithIds: number[];
  startDate: string;
  endDate: string;
};

export type { EditExpenseCycleRequest };
