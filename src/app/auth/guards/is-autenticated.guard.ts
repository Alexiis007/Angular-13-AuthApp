import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isAutenticatedGuard: CanActivateFn = (route, state) => {

  // const url = state.url;
  // localStorage.setItem('path',url);

  const authService = inject(AuthServiceService)
  if(authService.authStatus() === AuthStatus.authenticated){
    return true;
  }

  if(authService.authStatus() === AuthStatus.checking){
    return false;
  }

  const router = inject(Router);
  router.navigateByUrl('/auth/login');

  return false;
};
