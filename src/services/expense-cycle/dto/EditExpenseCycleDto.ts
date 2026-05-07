import type { DateTime } from 'luxon';
import type { EditExpenseCycleRequest } from '../requests';
import { InvalidDateError } from 'src/utils';
import type { User } from 'src/models/User';

class EditExpenseCycleDto {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly sharedWith: User[];
  readonly startDate: DateTime<true>;
  readonly endDate: DateTime<true>;

  constructor(data: {
    id: number;
    title: string;
    description: string;
    sharedWith: User[];
    startDate: DateTime;
    endDate: DateTime;
  }) {
    EditExpenseCycleDto.validateDates(data);

    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.sharedWith = data.sharedWith;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }

  private static validateDates(data: { startDate: DateTime; endDate: DateTime }) {
    const errors = [];

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

  toRequest(): EditExpenseCycleRequest {
    const description = this.description.length > 0 ? this.description : null;
    const sharedWithIds = this.sharedWith.map((el) => el.id);
    const startDate = this.startDate.toISO();
    const endDate = this.endDate.toISO();

    return {
      title: this.title,
      description,
      sharedWithIds,
      startDate,
      endDate,
    };
  }
}

export { EditExpenseCycleDto };
