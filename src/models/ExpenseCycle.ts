import type { User } from './User';

class ExpenseCycle {
  readonly id: number;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  readonly title: string;

  readonly description: string | null;

  readonly startDate: Date;

  readonly endDate: Date;

  readonly createdBy: User;

  readonly sharedWith: User[];

  constructor(data: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string | null;
    startDate: Date;
    endDate: Date;
    createdBy: User;
    sharedWith: User[];
  }) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.title = data.title;
    this.description = data.description;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.createdBy = data.createdBy;
    this.sharedWith = data.sharedWith;
  }
}

export { ExpenseCycle };
