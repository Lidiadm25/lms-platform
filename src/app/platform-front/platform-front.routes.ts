import { Routes } from '@angular/router';
import { PlatformFrontLayout } from './layout/platform-front-layout/platform-front-layout';
import { HomePage } from './pages/home-page/home-page';
import { ProjectsPage } from './pages/projects-page/projects-page';
import { UsersProjectPage } from './pages/users-project-page/users-project-page';



export const platformFrontRoutes: Routes = [
    {
        path: '',
        component: PlatformFrontLayout,
        children: [
            {
            path: '',
            component: HomePage
            },
            {
             path:'settings',
             component:HomePage
            },
            {
             path:'projects',
             component: ProjectsPage
            },
            {
             path:'users-project/:idProject',
             component: UsersProjectPage
            }
        ]
        
    },
    

];

export default platformFrontRoutes;