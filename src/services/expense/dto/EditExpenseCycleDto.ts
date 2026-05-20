import type { DateTime } from 'luxon';
import type { EditExpenseRequest } from '../requests';
import type { Money } from 'src/utils';
import type { User } from 'src/models/User';

class EditExpenseDto {
  readonly id: number;

  readonly description: string;

  readonly date: DateTime;

  readonly isProportional: boolean;

  readonly price: Money;

  readonly paidBy: User;

  readonly sharedBetween: User[];

  constructor(data: {
    id: number;
    description: string;
    date: DateTime;
    isProportional: boolean;
    price: Money;
    paidBy: User;
    sharedBetween: User[];
  }) {
    this.id = data.id;
    this.description = data.description;
    this.date = data.date;
    this.isProportional = data.isProportional;
    this.price = data.price;
    this.paidBy = data.paidBy;
    this.sharedBetween = data.sharedBetween;
  }

  toRequest(): EditExpenseRequest {
    const date = this.date.toISO();

    if (date === null) {
      throw new Error('invalid date');
    }

    return {
      description: this.description,
      date,
      isProportional: this.isProportional,
      valueInCents: this.price.valueInCents,
      paidByUserId: this.paidBy.id,
      sharedBetweenIds: this.sharedBetween.map((el) => el.id),
    };
  }
}

export { EditExpenseDto };
