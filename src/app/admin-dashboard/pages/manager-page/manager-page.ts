import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserProjectCreate } from '../../../auth/interfaces/user.interface';
import { UsersProjectService } from '../../../projects/services/UsersProjectService';
import { QuestionComponent } from '../../components/question-component/question-component';
import { SearchTags } from '../../components/search-tags/search-tags';
import { TableAccordeon } from '../../components/table-accordeon/table-accordeon';

@Component({
  selector: 'app-manager-page',
  imports: [RouterLink, RouterOutlet, SearchTags, TableAccordeon, QuestionComponent],
  templateUrl: './manager-page.html',


})
export class ManagerPage {
  activatedRoute = inject(ActivatedRoute);
  projectId: string = this.activatedRoute.snapshot.params['idProject'];
  userProjectService = inject(UsersProjectService);

  wasSaved = signal<boolean>(false);
  hasError = signal<boolean>(false);

  currentRoute!: string;
  constructor(private router: Router) {
   this.currentRoute =this.router.url;

   this.router.events.subscribe((event) => {     
      event instanceof NavigationEnd ?
       this.currentRoute = event.url : this.currentRoute = ''
         })
  }
  

  users: Array<string> = [];
  usersEmails: UserProjectCreate[] = [];
  async usersInscription(event: any) {
    this.users = event;
    for (let index = 0; index < this.users.length; index++) {
      this.usersEmails[index] = {
        projectId: this.projectId,
        userEmail: this.users[index],
      };
    }

    if (this.users.length > 0) {
      await this.userProjectService.addUsers(this.usersEmails).subscribe({
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
