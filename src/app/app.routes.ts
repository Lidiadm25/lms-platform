import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from './auth/guards/not-authenticated.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes'),
        canMatch: [
           notAuthenticatedGuard
        ] 
    },
  {
    path: 'admin',
    loadChildren: () => import('./admin-dashboard/admin-front.routes'),
  },
  {
    path:'',
    loadChildren: ()=> import('./platform-front/platform-front.routes')
  },
  {
    path:'**',
    // not found page!!
    loadChildren: ()=> import('./auth/auth.routes')
  }
];
