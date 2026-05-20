import type { DateTime } from 'luxon';
import type { Money } from 'src/utils';
import type { User } from './User';

class Expense {
  readonly id: number;

  readonly createdAt: DateTime;

  readonly updatedAt: DateTime;

  readonly description: string;

  readonly date: DateTime;

  readonly isProportional: boolean;

  readonly price: Money;

  readonly expenseCycle: { id: number };

  readonly paidBy: User;

  readonly sharedBetween: User[];

  constructor(data: {
    id: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    description: string;
    date: DateTime;
    isProportional: boolean;
    price: Money;
    expenseCycle: { id: number };
    paidBy: User;
    sharedBetween: User[];
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
