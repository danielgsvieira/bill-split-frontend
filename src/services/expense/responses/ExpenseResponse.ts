import { DateTime } from 'luxon';
import { Expense } from 'src/models/expense/Expense';
import { Money } from 'src/utils';
import { type ExpenseUserResponse, expenseUserResponseToModel } from './ExpenseUserResponse';

type ExpenseResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  date: string;
  isProportional: boolean;
  valueInCents: number;
  expenseCycle: { id: number };
  paidBy: ExpenseUserResponse;
  sharedBetween: ExpenseUserResponse[];
};

function expenseResponseToModel(data: ExpenseResponse): Expense;
function expenseResponseToModel(data: ExpenseResponse[]): Expense[];
function expenseResponseToModel(data: ExpenseResponse | ExpenseResponse[]): Expense | Expense[] {
  if (Array.isArray(data)) {
    return data.map((el) => expenseResponseToModel(el));
  }

  return new Expense({
    ...data,
    createdAt: DateTime.fromISO(data.createdAt),
    updatedAt: DateTime.fromISO(data.updatedAt),
    date: DateTime.fromISO(data.date),
    paidBy: expenseUserResponseToModel(data.paidBy),
    price: new Money(data.valueInCents),
    sharedBetween: expenseUserResponseToModel(data.sharedBetween),
  });
}

export { expenseResponseToModel };
export type { ExpenseResponse };
