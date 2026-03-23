import { Routes } from '@angular/router';
import { PlatformFrontLayout } from './layout/platform-front-layout/platform-front-layout';
import { HomePage } from './pages/home-page/home-page';
import { ProjectsPage } from '../admin-dashboard/pages/projects-page/projects-page';
import { UsersProjectPage } from '../admin-dashboard/pages/users-project-page/users-project-page';
import { CategoryProjectPage } from './pages/category-project-page/category-project-page';
import { ProjectDetails } from './pages/project-details/project-details';
import { SettingsPage } from './pages/settings-page/settings-page';



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
             component:SettingsPage
            },
            
            {
            path:'category/:name',
            component: CategoryProjectPage
            },
           
            {
            path:'project-details/:idProject',
            component: ProjectDetails
            },
            {
            path: 'home',
            redirectTo:'' 
            }
        ]
        
    },
    

];

export default platformFrontRoutes;