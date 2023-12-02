import { InvalidArgument } from '../exception/invalid-argument';

export class EnumValueObject {
  constructor(
    readonly value: string,
    private readonly options: { [s: string]: string },
  ) {
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    const isValid = Object.values(this.options).includes(value);

    if (!isValid) {
      throw new InvalidArgument(
        `<${value}> is not a valid <${this.constructor.name}>`,
      );
    }
  }
}
