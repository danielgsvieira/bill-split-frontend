import type { CreateExpenseRequest } from '../requests';
import type { ExpenseCycle } from 'src/models/ExpenseCycle';
import type { Money } from 'src/utils';
import type { User } from 'src/models/User';

class CreateExpenseDto {
  readonly description: string;

  readonly date: Date;

  readonly isProportional: boolean;

  readonly price: Money;

  readonly expenseCycle: ExpenseCycle;

  readonly paidBy: User;

  readonly sharedBetween: User[];

  constructor(data: {
    description: string;
    date: Date;
    isProportional: boolean;
    price: Money;
    expenseCycle: ExpenseCycle;
    paidBy: User;
    sharedBetween: User[];
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
    return {
      description: this.description,
      date: this.date.toISOString(),
      isProportional: this.isProportional,
      valueInCents: this.price.valueInCents,
      expenseCycleId: this.expenseCycle.id,
      paidByUserId: this.paidBy.id,
      sharedBetweenIds: this.sharedBetween.map((el) => el.id),
    };
  }
}

export { CreateExpenseDto };
