import { Expense } from 'src/models/Expense';
import { Money } from 'src/utils';
import { User } from 'src/models/User';
import type { UserResponse } from 'src/services';

type ExpenseResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  date: string;
  isProportional: boolean;
  valueInCents: number;
  expenseCycle: { id: number };
  paidBy: UserResponse;
  sharedBetween: UserResponse[];
};

function expenseResponseToModel(data: ExpenseResponse): Expense;
function expenseResponseToModel(data: ExpenseResponse[]): Expense[];
function expenseResponseToModel(data: ExpenseResponse | ExpenseResponse[]): Expense | Expense[] {
  if (Array.isArray(data)) {
    return data.map((el) => expenseResponseToModel(el));
  }

  return new Expense({
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
    date: new Date(data.date),
    paidBy: new User(data.paidBy),
    price: new Money(data.valueInCents),
    sharedBetween: data.sharedBetween.map((el) => new User(el)),
  });
}

export { expenseResponseToModel };
export type { ExpenseResponse };
