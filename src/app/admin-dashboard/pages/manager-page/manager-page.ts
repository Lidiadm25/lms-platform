import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { TableAccordeon } from '../../components/table-accordeon/table-accordeon';
import { SearchTags } from '../../components/search-tags/search-tags';
import { UserProjectCreate } from '../../../auth/interfaces/user.interface';
import { UsersProjectService } from '../../../projects/services/UsersProjectService';

@Component({
  selector: 'app-manager-page',
  imports: [RouterLink, RouterOutlet, TableAccordeon, SearchTags],
  templateUrl: './manager-page.html',
  styleUrl: './manager-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerPage {
  activatedRoute = inject(ActivatedRoute);
  projectId: string = this.activatedRoute.snapshot.params['idProject'];
  userProjectService = inject(UsersProjectService);

  wasSaved = signal<boolean>(false);
  hasError = signal<boolean>(false);

  ngOnInit() {
    
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
        next: (x) => { this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);},
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
