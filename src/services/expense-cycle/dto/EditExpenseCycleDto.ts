import type { EditExpenseCycleRequest } from '../requests';
import type { User } from 'src/models/User';

class EditExpenseCycleDto {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly sharedWith: User[];
  readonly startDate: Date;
  readonly endDate: Date;

  constructor(data: {
    id: number;
    title: string;
    description: string;
    sharedWith: User[];
    startDate: Date;
    endDate: Date;
  }) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.sharedWith = data.sharedWith;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }

  toRequest(): EditExpenseCycleRequest {
    return {
      title: this.title,
      description: this.description.length > 0 ? this.description : null,
      sharedWithIds: this.sharedWith.map((el) => el.id),
      startDate: this.startDate.toISOString(),
      endDate: this.endDate.toISOString(),
    };
  }
}

export { EditExpenseCycleDto };
