import type { CreateExpenseRequest } from '../requests';
import type { DateTime } from 'luxon';
import type { ExpenseCycleUser } from 'src/models/expense-cycle/ExpenseCycleUser';
import type { Money } from 'src/utils';

class CreateExpenseDto {
  declare readonly __brand: symbol & { __brand: 'CreateExpenseDto' };

  readonly description: string;

  readonly date: DateTime;

  readonly isProportional: boolean;

  readonly price: Money;

  readonly expenseCycle: { id: number };

  readonly paidBy: { id: number };

  readonly sharedBetween: { id: number }[];

  constructor(data: {
    description: string;
    date: DateTime;
    isProportional: boolean;
    price: Money;
    expenseCycle: { id: number };
    paidBy: ExpenseCycleUser;
    sharedBetween: ExpenseCycleUser[];
  }) {
    this.description = data.description;
    this.date = data.date;
    this.isProportional = data.isProportional;
    this.price = data.price;
    this.expenseCycle = data.expenseCycle;
    this.paidBy = data.paidBy;
    this.sharedBetween = data.sharedBetween;
  }

  toRequest(): CreateExpenseRequest {
    const date = this.date.toISO();
    if (date === null) {
      throw new Error('invalid date');
    }

    return {
      description: this.description,
      date,
      isProportional: this.isProportional,
      valueInCents: this.price.valueInCents,
      expenseCycleId: this.expenseCycle.id,
      paidByUserId: this.paidBy.id,
      sharedBetweenIds: this.sharedBetween.map((el) => el.id),
    };
  }
}

export { CreateExpenseDto };
