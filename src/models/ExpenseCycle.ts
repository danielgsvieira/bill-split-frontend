import type { DateTime } from 'luxon';
import { InvalidDateError } from 'src/utils';
import type { User } from './User';

class ExpenseCycle {
  readonly id: number;

  readonly createdAt: DateTime<true>;

  readonly updatedAt: DateTime<true>;

  readonly title: string;

  readonly description: string | null;

  readonly startDate: DateTime<true>;

  readonly endDate: DateTime<true>;

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
    ExpenseCycle.validateDates(data);

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

  private static validateDates(data: {
    createdAt: DateTime;
    updatedAt: DateTime;
    startDate: DateTime;
    endDate: DateTime;
  }) {
    const errors = [];

    if (!data.createdAt.isValid) {
      errors.push(new InvalidDateError('createdAt'));
    }

    if (!data.updatedAt.isValid) {
      errors.push(new InvalidDateError('updatedAt'));
    }

    if (!data.startDate.isValid) {
      errors.push(new InvalidDateError('startDate'));
    }

    if (!data.endDate.isValid) {
      errors.push(new InvalidDateError('endDate'));
    }

    if (errors.length > 0) {
      throw new AggregateError(errors);
    }
  }
}

export { ExpenseCycle };
