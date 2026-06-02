import type { DateTime } from 'luxon';
import type { ExpenseUser } from './ExpenseUser';
import type { Money } from 'src/utils';

class Expense {
  declare readonly __brand: symbol & { __brand: 'Expense' };

  readonly id: number;

  readonly createdAt: DateTime;

  readonly updatedAt: DateTime;

  readonly description: string;

  readonly date: DateTime;

  readonly isProportional: boolean;

  readonly price: Money;

  readonly expenseCycle: { id: number };

  readonly paidBy: ExpenseUser;

  readonly sharedBetween: ExpenseUser[];

  constructor(data: {
    id: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    description: string;
    date: DateTime;
    isProportional: boolean;
    price: Money;
    expenseCycle: { id: number };
    paidBy: ExpenseUser;
    sharedBetween: ExpenseUser[];
  }) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.description = data.description;
    this.date = data.date;
    this.isProportional = data.isProportional;
    this.price = data.price;
    this.expenseCycle = data.expenseCycle;
    this.paidBy = data.paidBy;
    this.sharedBetween = data.sharedBetween;
  }
}

export { Expense };
