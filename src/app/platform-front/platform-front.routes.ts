import { HomePage } from './pages/home-page/home-page';
import { Routes } from '@angular/router';
import { PlatformFrontLayout } from './layout/platform-front-layout/platform-front-layout';
import { ExplorePage } from './pages/explore-page/explore-page';
import { CategoryProjectPage } from './pages/category-project-page/category-project-page';
import { ProjectDetails } from './pages/project-details/project-details';
import { SettingsPage } from './pages/settings-page/settings-page';
import { TaskDetailsPage } from './pages/task-details-page/task-details-page';
import { ProjectViewPage } from './pages/project-view-page/project-view-page';
import { LessonViewPage } from './pages/lesson-view-page/lesson-view-page';
import { LayoutCourseView } from './components/top-bar-client/layout-course-view';
import { CalendarPage } from './pages/calendar-page/calendar-page';
import { GradesViewPage } from './pages/grades-view-page/grades-view-page';
import { checkEnrollGuard } from './guards/checkEnroll-guard';
import { notAuthenticatedGuard } from '../auth/guards/not-authenticated.guard';

export const platformFrontRoutes: Routes = [
  {
    path: '',
    component: PlatformFrontLayout,
  
    children: [
       {
        path: 'home',
        component: HomePage,
         data: { breadcrumb: 'home'},
      },
      {
        path: 'explore',
        component: ExplorePage,
      },
      {
        path: 'settings',
        component: SettingsPage,
      },

      {
        path: 'category/:name',
        component: CategoryProjectPage,
      },

      {
        path: 'project-details/:idProject',
        component: ProjectDetails,
      },
      {
        path: 'task/:idTask',
        component: TaskDetailsPage,
      },
     
      {
        path: 'course/:idProject',
        component: LayoutCourseView,
        canActivate:[checkEnrollGuard],
         data: { breadcrumb: 'course'},
       
        children: [
          { path: '', component: ProjectViewPage },
          {
            path: 'lesson/:idLesson',
            component: LessonViewPage,
               data: { breadcrumb: 'Lesson'},
          },
          {
            path:'calendar',
            component: CalendarPage,
               data: { breadcrumb: 'calendar'},
          },
          {
            path:'grades',
               data: { breadcrumb: 'Grades'},
            component: GradesViewPage
          }
          
          
        ],
      },
    ],
  },
];

export default platformFrontRoutes;
