import type { DateTime } from 'luxon';
import type { ExpenseCycleExpense } from './ExpenseCycleExpense';
import type { ExpenseCycleUser } from './ExpenseCycleUser';

class ExpenseCycleDetails {
  declare readonly __brand: symbol & { __brand: 'ExpenseCycleDetails' };

  readonly id: number;

  readonly createdAt: DateTime;

  readonly updatedAt: DateTime;

  readonly title: string;

  readonly description: string | null;

  readonly startDate: DateTime;

  readonly endDate: DateTime;

  readonly createdBy: ExpenseCycleUser;

  readonly sharedWith: ExpenseCycleUser[];

  readonly expenses: ExpenseCycleExpense[];

  constructor(data: {
    id: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    title: string;
    description: string | null;
    startDate: DateTime;
    endDate: DateTime;
    createdBy: ExpenseCycleUser;
    sharedWith: ExpenseCycleUser[];
    expenses: ExpenseCycleExpense[];
  }) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.title = data.title;
    this.description = data.description;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.createdBy = data.createdBy;
    this.sharedWith = data.sharedWith;
    this.expenses = data.expenses;
  }

  get users() {
    return [this.createdBy, ...this.sharedWith];
  }
}

export { ExpenseCycleDetails };
