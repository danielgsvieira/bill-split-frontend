type EditExpenseRequest = {
  description: string;
  date: string;
  isProportional: boolean;
  valueInCents: number;
  paidByUserId: number;
  sharedBetweenIds: number[];
};

export type { EditExpenseRequest };
