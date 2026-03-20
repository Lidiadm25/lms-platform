import { inject } from '@angular/core';
import { AuthService } from '../services/authService';
import type { CanMatchFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';

export const isAdminGuard: CanMatchFn = async (route, segments) => {

  const authService = inject(AuthService);
  await firstValueFrom(authService.checkStatus()); 

  return authService.isAdmin();
};
