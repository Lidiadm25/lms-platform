import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from './auth/guards/not-authenticated.guard';
import { NotFoundPage } from './shared/components/not-found-page/not-found-page';
import { authenticatedGuard } from './auth/guards/authenticated.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes'),
        canMatch: [
               notAuthenticatedGuard
            ] ,
        
    },
  {
    path: 'admin',
    loadChildren: () => import('./admin-dashboard/admin-front.routes'),
    canActivate: [authenticatedGuard]
  },
  {
    path:'',
    loadChildren: () => import('./platform-front/platform-front.routes'),
    canActivate: [authenticatedGuard]
       
  },
  {
    path:'**',
    // not found page!!
    component: NotFoundPage
  }
];
