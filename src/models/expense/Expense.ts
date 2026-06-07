import type { DateTime } from 'luxon';
import type { ExpenseUser } from './ExpenseUser';
import { Money } from 'src/utils';

type UserBudgetData = { userId: number; value: Money };

class Expense {
  declare readonly __brand: symbol & { __brand: 'Expense' };

  readonly id: number;

  readonly createdAt: DateTime;

  readonly updatedAt: DateTime;

  readonly description: string;

  readonly date: DateTime;

  readonly isProportional: boolean;

  readonly price: Money;

  readonly expenseCycle: { id: number };

  readonly paidBy: ExpenseUser;

  readonly sharedBetween: ExpenseUser[];

  constructor(data: {
    id: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    description: string;
    date: DateTime;
    isProportional: boolean;
    price: Money;
    expenseCycle: { id: number };
    paidBy: ExpenseUser;
    sharedBetween: ExpenseUser[];
  }) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.description = data.description;
    this.date = data.date;
    this.isProportional = data.isProportional;
    this.price = data.price;
    this.expenseCycle = data.expenseCycle;
    this.paidBy = data.paidBy;
    this.sharedBetween = data.sharedBetween;
  }

  get sharedBetweenIds() {
    return this.sharedBetween.map((el) => el.id);
  }

  get sortedSharedBetween() {
    return this.sharedBetween.toSorted((a, b) => {
      if (a.id === this.paidBy.id) {
        return 1;
      }

      if (b.id === this.paidBy.id) {
        return -1;
      }

      return a.displayName.localeCompare(b.displayName);
    });
  }

  get users() {
    const isPayerIncludedInSharedBetween = this.sharedBetween.some(
      (el) => el.id === this.paidBy.id,
    );

    return isPayerIncludedInSharedBetween
      ? [...this.sharedBetween]
      : [...this.sharedBetween, this.paidBy];
  }

  getValuePerUser(userBudgets?: UserBudgetData[]): { user: ExpenseUser; value: Money }[] {
    if (this.isProportional) {
      return this.getValuePerUserProportional(userBudgets);
    }

    const valuePerUser = new Money(Math.floor(this.price.valueInCents / this.sharedBetween.length));

    const result: { user: ExpenseUser; value: Money }[] = [];

    let rest = new Money(this.price.valueInCents);
    this.sortedSharedBetween.forEach((user, index) => {
      const isLast = index === this.sharedBetween.length - 1;

      let valueForUser: Money;
      if (isLast) {
        valueForUser = new Money(rest.valueInCents);
      } else {
        valueForUser = new Money(valuePerUser.valueInCents);
        rest = new Money(rest.valueInCents - rest.valueInCents);
      }

      result.push({ user, value: valueForUser });
    });

    return result;
  }

  private getValuePerUserProportional(userBudgets?: UserBudgetData[]) {
    if (userBudgets === undefined) {
      throw new Error(
        "Can't calculate value per user of a proportional expense without userBudgets",
      );
    }

    const hasInvalidBudgets = this.sharedBetween.some((user) => {
      const foundBudget = userBudgets.find((el) => el.userId === user.id);

      return foundBudget === undefined || foundBudget.value.valueInCents <= 0;
    });

    if (hasInvalidBudgets) {
      throw new Error('All users must have a budget and all budgets must me more than 0');
    }

    const filteredUserBudgets = userBudgets.filter((el) =>
      this.sharedBetweenIds.includes(el.userId),
    );

    const budgetTotalSum = filteredUserBudgets.reduce((acc, { value }) => {
      return new Money(acc.valueInCents + value.valueInCents);
    }, new Money(0));

    const proportionPerUserMap = filteredUserBudgets.reduce<Record<number, number>>(
      (acc, { userId, value }) => {
        acc[userId] = value.valueInCents / budgetTotalSum.valueInCents;
        return acc;
      },
      {},
    );

    const result: { user: ExpenseUser; value: Money }[] = [];

    let rest = new Money(this.price.valueInCents);
    this.sortedSharedBetween.forEach((user, index) => {
      const isLast = index === this.sharedBetween.length - 1;

      let valueForUser: Money;
      if (isLast) {
        valueForUser = new Money(rest.valueInCents);
      } else {
        const proportionForUser = proportionPerUserMap[user.id] ?? 0;
        valueForUser = new Money(Math.floor(proportionForUser * this.price.valueInCents));
        rest = new Money(rest.valueInCents - valueForUser.valueInCents);
      }

      result.push({ user, value: valueForUser });
    });

    return result;
  }

  getBalancePerUser(userBudgets?: UserBudgetData[]) {
    const valuesPerUser = this.getValuePerUser(userBudgets);

    const result = this.users.map((user) => {
      return { user, balance: new Money(0) };
    });

    result.forEach((userBalanceData) => {
      const valueForUser =
        valuesPerUser.find((el) => el.user.id === userBalanceData.user.id)?.value ?? new Money(0);
      const isWhoPaid = userBalanceData.user.id === this.paidBy.id;

      userBalanceData.balance = new Money(
        isWhoPaid
          ? this.price.valueInCents - valueForUser.valueInCents
          : -1 * valueForUser.valueInCents,
      );
    });

    return result;
  }
}

export { Expense };
