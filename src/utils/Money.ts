class Money {
  readonly cents: number;

  /**
   *
   * @param cents needs to be an integer or it will throw an exception
   */
  constructor(cents: number) {
    if (Number.isInteger(cents)) {
      throw new Error('cents must be and integer');
    }

    this.cents = cents;
  }

  add(value: Money) {
    return new Money(this.cents + value.cents);
  }

  subtract(value: Money) {
    return new Money(this.cents - value.cents);
  }
}

export { Money };
