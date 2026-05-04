type CreateExpenseCycleRequest = {
  title: string;
  description: string | null;
  sharedWithIds: number[] | null;
  startDate: string;
  endDate: string;
};

export type { CreateExpenseCycleRequest };
