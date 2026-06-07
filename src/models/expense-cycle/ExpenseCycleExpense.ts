import type { DateTime } from 'luxon';

class ExpenseCycleExpense {
  declare readonly __brand: symbol & { __brand: 'ExpenseCycleExpense' };

  readonly id: number;

  readonly date: DateTime;

  readonly userIds: number[];

  constructor(data: { id: number; date: DateTime; userIds: number[] }) {
    this.id = data.id;
    this.date = data.date;
    this.userIds = data.userIds;
  }
}

export { ExpenseCycleExpense };
