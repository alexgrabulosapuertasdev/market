import { InvalidArgument } from '../exception/invalid-argument';

export class DateValueObject {
  constructor(readonly value: Date) {
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: Date): void {
    const isValid = value instanceof Date;

    if (!isValid) {
      throw new InvalidArgument(
        `<${value}> is not a valid <${this.constructor.name}>`,
      );
    }
  }
}
