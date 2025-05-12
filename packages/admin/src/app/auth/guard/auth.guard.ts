import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  return authService.isLogged().pipe(
    map((isLogged) => {
      if (isLogged) {
        return true;
      }

      return false;
    }),
  );
};
