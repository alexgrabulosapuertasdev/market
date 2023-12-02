import { USER_ROLE } from '../enum/user.role';
import { EnumValueObject } from '../../../shared/domain/value-object/enum.value-object';

export class UserRole extends EnumValueObject {
  constructor(readonly value: USER_ROLE) {
    super(value, USER_ROLE);
  }
}
