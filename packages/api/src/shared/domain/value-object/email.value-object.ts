import { InvalidArgument } from '../exception/invalid-argument';

export class EmailValueObject {
  private readonly regexValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  constructor(readonly value: string) {
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    const isValid = this.regexValidator.test(value);

    if (!isValid) {
      throw new InvalidArgument(
        `<${value}> is not a valid <${this.constructor.name}>`,
      );
    }
  }
}
