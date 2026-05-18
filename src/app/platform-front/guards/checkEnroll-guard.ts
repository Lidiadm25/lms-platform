import { Router, type CanActivateFn } from '@angular/router';
import { UsersProjectService } from '../../projects/services/UsersProjectService';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const checkEnrollGuard: CanActivateFn = (route, state) => {
 const userProjectService = inject(UsersProjectService)
 const router = inject(Router)
 const idProject = route.paramMap.get('idProject')

 if(!idProject) {
  router.navigate(['/invent'])
  return of(false)
 }
 return userProjectService.checkEnroll(idProject).pipe(
  map(isEnrolled => {
    if(isEnrolled) return true

    router.navigate(['/invent'])
    return false;
  }),
  catchError(()=> {
    router.navigate(['/invent'])
    return of(false)
  })
 )

 
};
