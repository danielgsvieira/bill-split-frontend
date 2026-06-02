class ExpenseCycleUser {
  declare readonly __brand: symbol & { __brand: 'ExpenseCycleUser' };

  readonly id: number;

  readonly username: string;

  readonly displayName: string;

  constructor(data: { id: number; username: string; displayName: string }) {
    this.id = data.id;
    this.username = data.username;
    this.displayName = data.displayName;
  }
}

export { ExpenseCycleUser };
