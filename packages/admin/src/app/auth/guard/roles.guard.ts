import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';

export const rolesGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);

  const requiredRoles: string[] = route.data['roles'];

  return authService.getUserRole().pipe(
    map((role) => {
      if (!role || !requiredRoles.includes(role)) {
        return false;
      }

      return true;
    }),
  );
};
