type EditExpenseRequest = {
  description: string;
  date: string;
  isProportional: boolean;
  valueInCents: number;
  paidByUserId: number;
  sharedBetweenIds: number[];
  tagIds: number[];
};

export type { EditExpenseRequest };
