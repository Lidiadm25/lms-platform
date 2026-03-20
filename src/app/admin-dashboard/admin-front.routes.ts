import { Routes } from '@angular/router';
import { PlatformFrontLayout } from '../platform-front/layout/platform-front-layout/platform-front-layout';
import { ProjectManagerPage } from './pages/project-manager-page/project-manager-page';
import { isAdminGuard } from '../auth/guards/is-admin.guard';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { ProjectsPage } from './pages/projects-page/projects-page';
import { UsersProjectPage } from './pages/users-project-page/users-project-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';


export const platformFrontRoutes: Routes = [
    {
        path: '',
        component: DashboardLayout,
        canMatch:[isAdminGuard],
        children:[
            {
                path: '',
                component: DashboardPage
            }
            ,
            {
             path:'admin-project',
             component: ProjectManagerPage
            },
            {
             path:'projects',
             component: ProjectsPage
            },
             {
             path:'users-project/:idProject',
             component: UsersProjectPage
            },
            {
             path:'project-manager/:idProject',
             component: ProjectManagerPage
            }

        ]
    },
    
];

export default platformFrontRoutes;