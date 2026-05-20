import type { CreateExpenseCycleRequest } from '../requests';
import type { DateTime } from 'luxon';
import type { User } from 'src/models/User';

class CreateExpenseCycleDto {
  readonly title: string;
  readonly description: string;
  readonly sharedWith: User[];
  readonly startDate: DateTime;
  readonly endDate: DateTime;

  constructor(data: {
    title: string;
    description: string;
    sharedWith: User[];
    startDate: DateTime;
    endDate: DateTime;
  }) {
    this.title = data.title;
    this.description = data.description;
    this.sharedWith = data.sharedWith;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }

  toRequest(): CreateExpenseCycleRequest {
    const startDate = this.startDate.toISO();
    const endDate = this.endDate.toISO();

    if (startDate === null || endDate === null) {
      throw new Error('invalid date');
    }

    return {
      title: this.title,
      description: this.description.length > 0 ? this.description : null,
      sharedWithIds: this.sharedWith.length > 0 ? this.sharedWith.map((el) => el.id) : null,
      startDate,
      endDate,
    };
  }
}

export { CreateExpenseCycleDto };
