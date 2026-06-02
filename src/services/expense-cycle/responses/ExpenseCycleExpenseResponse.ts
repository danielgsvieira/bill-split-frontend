import { DateTime } from 'luxon';
import { ExpenseCycleExpense } from 'src/models/expense-cycle/ExpenseCycleExpense';

type ExpenseCycleExpenseResponse = {
  id: number;
  date: string;
};

function expenseCycleExpenseResponseToModel(data: ExpenseCycleExpenseResponse): ExpenseCycleExpense;
function expenseCycleExpenseResponseToModel(
  data: ExpenseCycleExpenseResponse[],
): ExpenseCycleExpense[];
function expenseCycleExpenseResponseToModel(
  data: ExpenseCycleExpenseResponse | ExpenseCycleExpenseResponse[],
): ExpenseCycleExpense | ExpenseCycleExpense[] {
  if (Array.isArray(data)) {
    return data.map((el) => expenseCycleExpenseResponseToModel(el));
  }

  return new ExpenseCycleExpense({ id: data.id, date: DateTime.fromISO(data.date) });
}

export { expenseCycleExpenseResponseToModel };
export type { ExpenseCycleExpenseResponse };
