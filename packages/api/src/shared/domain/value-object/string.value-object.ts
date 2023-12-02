import { InvalidArgument } from '../exception/invalid-argument';

export class StringValueObject {
  constructor(readonly value: string) {
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    if (!value) {
      throw new InvalidArgument(`<${this.constructor.name}> is required`);
    }
  }
}
