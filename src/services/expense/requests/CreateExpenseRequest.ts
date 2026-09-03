type CreateExpenseRequest = {
  description: string;
  date: string;
  isProportional: boolean;
  valueInCents: number;
  expenseCycleId: number;
  paidByUserId: number;
  sharedBetweenIds: number[];
  tagIds: number[];
};

export type { CreateExpenseRequest };
