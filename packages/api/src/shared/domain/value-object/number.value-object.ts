import { InvalidArgument } from '../exception/invalid-argument';

export class NumberValueObject {
  constructor(readonly value: number) {
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: number): void {
    if (value === undefined || value === null) {
      throw new InvalidArgument(`<${this.constructor.name}> is required`);
    }
  }
}
