import { InvalidArgument } from '../exception/invalid-argument';

export class Uuid {
  private readonly regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

  constructor(readonly value: string) {
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    const isValid = this.regex.exec(value);

    if (!isValid) {
      throw new InvalidArgument(
        `${value} is not a valid <${this.constructor.name}>`,
      );
    }
  }
}
