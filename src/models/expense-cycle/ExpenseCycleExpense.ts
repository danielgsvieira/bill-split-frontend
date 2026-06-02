import type { DateTime } from 'luxon';

class ExpenseCycleExpense {
  declare readonly __brand: symbol & { __brand: 'ExpenseCycleExpense' };

  readonly id: number;

  readonly date: DateTime;

  constructor(data: { id: number; date: DateTime }) {
    this.id = data.id;
    this.date = data.date;
  }
}

export { ExpenseCycleExpense };
