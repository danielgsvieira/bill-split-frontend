class Money {
  declare readonly __brand: symbol & { __brand: 'Money' };

  readonly valueInCents: number;

  constructor(valueInCents: number) {
    if (!Number.isInteger(valueInCents)) {
      throw new Error('valueInCents must be an integer');
    }

    this.valueInCents = valueInCents;
  }

  get decimalValue(): number {
    return this.valueInCents / 100;
  }
}

export { Money };
