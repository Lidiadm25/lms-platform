import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserProjectCreate } from '../../../auth/interfaces/user.interface';
import { UsersProjectService } from '../../../projects/services/UsersProjectService';
import { SearchTags } from '../../components/search-tags/search-tags';
import { TableAccordeon } from '../../components/table-accordeon/table-accordeon';
import { CourseStateService } from '../../../projects/services/CourseStateService';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProjectService } from '../../../projects/services/ProjectService';
@Component({
  selector: 'app-manager-page',
  imports: [RouterLink, RouterOutlet, SearchTags, TableAccordeon],
  templateUrl: './manager-page.html',
})
export class ManagerPage {
  activatedRoute = inject(ActivatedRoute);
  userProjectService = inject(UsersProjectService);
  courseState = inject(CourseStateService);
  projectService = inject(ProjectService);
  router = inject(Router);

  wasSaved = signal<boolean>(false);
  hasError = signal<boolean>(false);
  accordionData = signal<any>(null);
   id = signal<string>('create');
  private projectIdSignal = toSignal(
    this.activatedRoute.paramMap.pipe(
      map(params => params.get('idProject'))
    )
  );

  currentRoute!: string;
  users: Array<string> = [];
  usersEmails: UserProjectCreate[] = [];

  constructor() {
    this.currentRoute = this.router.url;
    
    effect(() => {
      const projectId = this.projectIdSignal();
      this.id.set(projectId ?? 'create');
      this.courseState.reload();

      if (projectId) {
        this.projectService.getById(projectId).subscribe({
          next: (data) => this.accordionData.set(data),
          error: (err) => console.error('Error loading the course:', err)
        });
      }
    });
  }

  usersInscription(event: any) {
    this.users = event;
    
    this.usersEmails = this.users.map((email: string) => ({
      projectId: this.projectIdSignal()!,
      userEmail: email,
    }));

    if (this.users.length > 0) {
      this.userProjectService.addUsers(this.usersEmails).subscribe({
        next: (x) => {
          this.wasSaved.set(true);
          setTimeout(() => {
            this.wasSaved.set(false);
          }, 3000);
        },
        error: (e) => {
          this.hasError.set(true);
          setTimeout(() => {
            this.hasError.set(false);
          }, 3000);
        },
      });
    }
  }
}