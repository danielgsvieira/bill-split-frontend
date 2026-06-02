import type { DateTime } from 'luxon';
import type { EditExpenseRequest } from '../requests';
import type { ExpenseCycleUser } from 'src/models/expense-cycle/ExpenseCycleUser';
import type { Money } from 'src/utils';

class EditExpenseDto {
  declare readonly __brand: symbol & { __brand: 'EditExpenseDto' };

  readonly id: number;

  readonly description: string;

  readonly date: DateTime;

  readonly isProportional: boolean;

  readonly price: Money;

  readonly paidBy: ExpenseCycleUser;

  readonly sharedBetween: ExpenseCycleUser[];

  constructor(data: {
    id: number;
    description: string;
    date: DateTime;
    isProportional: boolean;
    price: Money;
    paidBy: ExpenseCycleUser;
    sharedBetween: ExpenseCycleUser[];
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
