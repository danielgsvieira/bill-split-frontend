import type { DateTime } from 'luxon';
import type { ExpenseCycleUser } from './ExpenseCycleUser';

class ExpenseCycleListItem {
  declare readonly __brand: symbol & { __brand: 'ExpenseCycleListItem' };

  readonly id: number;

  readonly title: string;

  readonly description: string | null;

  readonly startDate: DateTime;

  readonly endDate: DateTime;

  readonly createdBy: ExpenseCycleUser;

  constructor(data: {
    id: number;
    title: string;
    description: string | null;
    startDate: DateTime;
    endDate: DateTime;
    createdBy: ExpenseCycleUser;
  }) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.createdBy = data.createdBy;
  }
}

export { ExpenseCycleListItem };
