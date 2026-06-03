import type { ExpenseCycleUserBudget } from 'src/models/expense-cycle/ExpenseCycleUserBudget';
import type { UpdateExpenseCycleUserBudgetsRequest } from '../requests';

class UpdateExpenseCycleUserBudgetsDto {
  declare readonly __brand: symbol & { __brand: 'UpdateExpenseCycleUserBudgetsDto' };

  readonly budgets: ExpenseCycleUserBudget[];

  constructor(data: { budgets: ExpenseCycleUserBudget[] }) {
    this.budgets = data.budgets;
  }

  toRequest(): UpdateExpenseCycleUserBudgetsRequest {
    return {
      budgets: this.budgets.map((el) => {
        return { id: el.id, valueInCents: el.value.valueInCents };
      }),
    };
  }
}

export { UpdateExpenseCycleUserBudgetsDto };
