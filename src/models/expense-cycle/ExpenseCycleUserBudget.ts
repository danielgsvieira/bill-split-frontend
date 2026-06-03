import type { ExpenseCycleUser } from './ExpenseCycleUser';
import type { Money } from 'src/utils';

class ExpenseCycleUserBudget {
  declare readonly __brand: symbol & { __brand: 'ExpenseCycleUserBudget' };

  readonly id: number;

  readonly value: Money;

  readonly user: ExpenseCycleUser;

  constructor(data: { id: number; value: Money; user: ExpenseCycleUser }) {
    this.id = data.id;
    this.value = data.value;
    this.user = data.user;
  }
}

export { ExpenseCycleUserBudget };
