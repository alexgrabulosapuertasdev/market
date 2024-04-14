import { InvalidArgument } from '../exception/invalid-argument';

interface ImageValue {
  originalname: string;
  mimetype: string;
  size: number;
  base64: string;
}

export class ImageValueObject {
  constructor(readonly value: ImageValue) {}

  private ensureIsValid(value: ImageValue): void {
    if (!value.originalname) {
      throw new InvalidArgument(
        `<${this.constructor.name} originalname> is required`,
      );
    }

    if (!value.mimetype) {
      throw new InvalidArgument(
        `<${this.constructor.name} mimetype> is required`,
      );
    }

    if (!value.size) {
      throw new InvalidArgument(`<${this.constructor.name} size> is required`);
    }

    if (!value.base64) {
      throw new InvalidArgument(
        `<${this.constructor.name} base64> is required`,
      );
    }
  }
}
