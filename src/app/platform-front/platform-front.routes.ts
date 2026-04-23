import { HomePage } from './pages/home-page/home-page';
import { Routes } from '@angular/router';
import { PlatformFrontLayout } from './layout/platform-front-layout/platform-front-layout';
import { ExplorePage } from './pages/explore-page/explore-page';
import { CategoryProjectPage } from './pages/category-project-page/category-project-page';
import { ProjectDetails } from './pages/project-details/project-details';
import { SettingsPage } from './pages/settings-page/settings-page';
import { TaskDetailsPage } from './pages/task-details-page/task-details-page';
import { ProjectViewPage } from './pages/project-view-page/project-view-page';



export const platformFrontRoutes: Routes = [
    {
        path: '',
        component: PlatformFrontLayout,
        children: [
            {
            path: 'explore',
            component: ExplorePage
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
            path:'task/:idTask',
            component: TaskDetailsPage
           },
            {
            path: 'home',
            component: HomePage 
            },
            {path: 'project/:idProject',
            component: ProjectViewPage
            }
        ]
        
    },
    

];

export default platformFrontRoutes;