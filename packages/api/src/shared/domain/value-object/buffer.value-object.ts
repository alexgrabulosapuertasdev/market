import { InvalidArgument } from '../exception/invalid-argument';

export class BufferValueObject {
  constructor(readonly value: Buffer) {
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: Buffer): void {
    if (!value || value.length === 0) {
      throw new InvalidArgument(`<${this.constructor.name}> must not be empty`);
    }
  }
}
