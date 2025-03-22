import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn } from "@angular/router";
import { AuthService } from "../../services/auth.service";

export const rolesGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);

  const requiredRoles: string[] = route.data['roles'];
  const userRoles: string[] = authService.getUserRoles();

  if (!userRoles || !requiredRoles.some((role) => userRoles.includes(role))) {
    return false;
  }

  return true;
};
