import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const localData = localStorage.getItem('loggedIn');
  const router = inject(Router);

  // Check if the user is logged in
  if (localData === 'true') {
    return true;  // Allow access
  } else {
    router.navigate(['login']); // Navigate to login if not logged in
    return false; // Deny access
  }
};
