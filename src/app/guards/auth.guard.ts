import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let token = localStorage.getItem("token")
  console.log(token)
  const router = inject(Router)
  if(token === null){
    router.navigate(['/login']);
    return false
  }
  return true;
};
