import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../interfaces';
import { AuthServiceService } from '../services/auth.service';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthServiceService)
  if(authService.authStatus() === AuthStatus.authenticated){
    router.navigateByUrl('/dashboard');
    return false;
  }
  return true;
};
