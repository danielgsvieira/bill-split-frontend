import type { DateTime } from 'luxon';

class ExpenseCycle {
  declare readonly __brand: symbol & { __brand: 'ExpenseCycle' };

  readonly id: number;

  readonly createdAt: DateTime;

  readonly updatedAt: DateTime;

  readonly title: string;

  readonly description: string | null;

  readonly startDate: DateTime;

  readonly endDate: DateTime;

  constructor(data: {
    id: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    title: string;
    description: string | null;
    startDate: DateTime;
    endDate: DateTime;
  }) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.title = data.title;
    this.description = data.description;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }
}

export { ExpenseCycle };
