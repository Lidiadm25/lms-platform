import { Routes } from '@angular/router';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { LoginPage } from './pages/login-page/login-page';


export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: LoginPage,
      },
     /* {
        path: 'register',
        component: RegisterPageComponent,
      },*/
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];

export default authRoutes;