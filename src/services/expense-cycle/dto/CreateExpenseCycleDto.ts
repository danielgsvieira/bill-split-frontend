import type { CreateExpenseCycleRequest } from '../requests';
import type { User } from 'src/models/User';

class CreateExpenseCycleDto {
  readonly title: string;
  readonly description: string;
  readonly sharedWith: User[];
  readonly startDate: Date;
  readonly endDate: Date;

  constructor(data: {
    title: string;
    description: string;
    sharedWith: User[];
    startDate: Date;
    endDate: Date;
  }) {
    this.title = data.title;
    this.description = data.description;
    this.sharedWith = data.sharedWith;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }

  toRequest(): CreateExpenseCycleRequest {
    return {
      title: this.title,
      description: this.description.length > 0 ? this.description : null,
      sharedWithIds: this.sharedWith.length > 0 ? this.sharedWith.map((el) => el.id) : null,
      startDate: this.startDate.toISOString(),
      endDate: this.endDate.toISOString(),
    };
  }
}

export { CreateExpenseCycleDto };
