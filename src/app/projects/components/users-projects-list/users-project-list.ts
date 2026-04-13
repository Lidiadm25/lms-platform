import { UserProjectCreate } from './../../../auth/interfaces/user.interface';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { UsersProjectResponse } from '../../../auth/interfaces/user.interface';
import { UsersProjectService } from '../../services/UsersProjectService';

@Component({
  selector: 'app-users-project-list',
  imports: [],
  templateUrl: './users-project-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersProjectList {
  users = input.required<UsersProjectResponse>();
  selectedAll = signal(false);

  usersProjectService = inject(UsersProjectService)

  toggleAll(event: any) {
    let checkboxes = document.querySelectorAll('input');
    event.target.checked ? this.selectedAll.set(true) : this.selectedAll.set(false);

    checkboxes.forEach((element) => {
      if (element.name == 'cb' && this.selectedAll() == true) {
        element.checked = true;
      } else if (element.name == 'cb' && this.selectedAll() == false) {
        element.checked = false;
      }
    });
  }

  usersIds: string[] = [];

  usersInscriptionDelete(event: any) {


    let checkboxes = document.querySelectorAll('input');
    checkboxes.forEach((element) => {
      if (element.name == 'cb' && element.checked) {
        this.usersIds.push(element.value);
      }
    });

    if(this.usersIds.length>0){
      this.usersProjectService.removeUsers(this.usersIds).subscribe(() => console.log("Users removed"))
    }
    this.usersIds = [];
  }
}
