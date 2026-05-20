import type { DateTime } from 'luxon';
import type { User } from './User';

class ExpenseCycle {
  readonly id: number;

  readonly createdAt: DateTime;

  readonly updatedAt: DateTime;

  readonly title: string;

  readonly description: string | null;

  readonly startDate: DateTime;

  readonly endDate: DateTime;

  readonly createdBy: User;

  readonly sharedWith: User[];

  constructor(data: {
    id: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    title: string;
    description: string | null;
    startDate: DateTime;
    endDate: DateTime;
    createdBy: User;
    sharedWith: User[];
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
  }
}

export { ExpenseCycle };
