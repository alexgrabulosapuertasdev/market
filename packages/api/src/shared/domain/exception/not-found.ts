import { Exception } from './exception';

export class NotFound extends Exception {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
