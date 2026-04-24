import { Routes } from '@angular/router';
import { isAdminGuard } from '../auth/guards/is-admin.guard';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { LessonManagerPage } from './pages/lesson-manager-page/lesson-manager-page';
import { ProjectManagerPage } from './pages/project-manager-page/project-manager-page';
import { ProjectsPage } from './pages/projects-page/projects-page';
import { UsersProjectPage } from './pages/users-project-page/users-project-page';

import { UnitsManagerPage } from './pages/units-manager-page/units-manager-page';
import { TaskManagerPage } from './pages/task-manager-page/task-manager-page';
import { GradesManagerPage } from './pages/grades-manager-page/grades-manager-page';
import { ManagerPage } from './pages/manager-page/manager-page';

export const platformFrontRoutes: Routes = [
  {
    path: '',
    component: DashboardLayout,
    canMatch: [isAdminGuard],
    children: [
      {
        path: '',
        component: DashboardPage,
      },
      {
        path: 'admin-project',
        component: ProjectManagerPage,
      },
      {
        path: 'projects',
        component: ProjectsPage,
      },
      {
        path: 'users-project/:idProject',
        component: UsersProjectPage,
      },

      {
        path: 'grades-manager/:idProject',
        component: GradesManagerPage,
      },
      {
        path: 'manager/:idProject',
        component: ManagerPage,
        children: [
          {
            path: '',
            component: ProjectManagerPage,
          },
          {
            path: ':idUnit',
            component: UnitsManagerPage,
          },
          {
            path: ':idUnit/:idLesson',
            component: LessonManagerPage,
          },
          {
            path: ':idUnit/:idLesson/:idTask',
            component: TaskManagerPage,
          },
        ],
      },
    ],
  },
];

export default platformFrontRoutes;
