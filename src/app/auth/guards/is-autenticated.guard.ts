import { CanActivateFn } from '@angular/router';

export const isAutenticatedGuard: CanActivateFn = (route, state) => {
  return true;
};
