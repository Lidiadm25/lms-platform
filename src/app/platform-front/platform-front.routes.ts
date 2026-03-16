import { Routes } from '@angular/router';
import { PlatformFrontLayout } from './layout/platform-front-layout/platform-front-layout';
import { HomePage } from './pages/home-page/home-page';

export const platformFrontRoutes: Routes = [
    {
        path: '',
        component: PlatformFrontLayout,
        children: [
            {
            path: '',
            component: HomePage
            }
        ]
        
    },
    

];

export default platformFrontRoutes;