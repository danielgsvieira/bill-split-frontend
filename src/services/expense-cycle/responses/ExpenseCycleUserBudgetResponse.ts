import { ExpenseCycleUserBudget } from 'src/models/expense-cycle/ExpenseCycleUserBudget';
import { Money } from 'src/utils';
import {
  type ExpenseCycleUserResponse,
  expenseCycleUserResponseToModel,
} from './ExpenseCycleUserResponse';

type ExpenseCycleUserBudgetResponse = {
  id: number;
  valueInCents: number;
  user: ExpenseCycleUserResponse;
};

function expenseCycleUserBudgetResponseToModel(
  data: ExpenseCycleUserBudgetResponse,
): ExpenseCycleUserBudget;
function expenseCycleUserBudgetResponseToModel(
  data: ExpenseCycleUserBudgetResponse[],
): ExpenseCycleUserBudget[];
function expenseCycleUserBudgetResponseToModel(
  data: ExpenseCycleUserBudgetResponse | ExpenseCycleUserBudgetResponse[],
): ExpenseCycleUserBudget | ExpenseCycleUserBudget[] {
  if (Array.isArray(data)) {
    return data.map((el) => expenseCycleUserBudgetResponseToModel(el));
  }

  return new ExpenseCycleUserBudget({
    id: data.id,
    value: new Money(data.valueInCents),
    user: expenseCycleUserResponseToModel(data.user),
  });
}

export { expenseCycleUserBudgetResponseToModel };

export type { ExpenseCycleUserBudgetResponse };
