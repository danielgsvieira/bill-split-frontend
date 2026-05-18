import type { EditExpenseRequest } from '../requests';
import type { User } from 'src/models/User';

class EditExpenseDto {
  readonly id: number;

  readonly description: string;

  readonly date: Date;

  readonly isProportional: boolean;

  readonly valueInCents: number;

  readonly paidBy: User;

  readonly sharedBetween: User[];

  constructor(data: {
    id: number;
    description: string;
    date: Date;
    isProportional: boolean;
    valueInCents: number;
    paidBy: User;
    sharedBetween: User[];
  }) {
    this.id = data.id;
    this.description = data.description;
    this.date = data.date;
    this.isProportional = data.isProportional;
    this.valueInCents = data.valueInCents;
    this.paidBy = data.paidBy;
    this.sharedBetween = data.sharedBetween;
  }

  toRequest(): EditExpenseRequest {
    return {
      description: this.description,
      date: this.date.toISOString(),
      isProportional: this.isProportional,
      valueInCents: this.valueInCents,
      paidByUserId: this.paidBy.id,
      sharedBetweenIds: this.sharedBetween.map((el) => el.id),
    };
  }
}

export { EditExpenseDto };
