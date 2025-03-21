import { UnauthorizedException } from '@nestjs/common';

export class Unauthorized extends UnauthorizedException {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
