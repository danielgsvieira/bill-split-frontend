class ExpenseTag {
  declare readonly __brand: symbol & { __brand: 'ExpenseTag' };

  readonly id: number;

  readonly description: string;

  readonly color: string;

  constructor(data: { id: number; description: string; color: string }) {
    this.id = data.id;
    this.description = data.description;
    this.color = data.color;
  }
}

export { ExpenseTag };
