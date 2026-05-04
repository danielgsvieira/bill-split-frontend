class InvalidDateError extends Error {
  constructor(variableName: string) {
    super(`${variableName} can not be an invalid date.`);
  }
}

export { InvalidDateError };
