import { Exception } from './exception';

export class InvalidArgument extends Exception {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
