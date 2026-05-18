import { Component, inject, input, output, signal } from '@angular/core';
import { UsersProjectResponse } from '../../../auth/interfaces/user.interface';
import { UsersProjectService } from '../../services/UsersProjectService';

@Component({
  selector: 'app-users-project-list',
  imports: [],
  templateUrl: './users-project-list.html',

})
export class UsersProjectList {
  users = input.required<UsersProjectResponse>();
  selectedAll = signal(false);
  hasError = signal<boolean>(false);
  wasSaved = signal<boolean>(false);
  usersProjectService = inject(UsersProjectService);
  message = signal<string>('There was an error deleting users');

  changes = output<boolean>();

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

    if (this.usersIds.length > 0) {
      this.usersProjectService.removeUsers(this.usersIds).subscribe({
        next: () => {
          this.wasSaved.set(true);
          setTimeout(() => {
            this.wasSaved.set(false);
          }, 3000);

          this.changes.emit(true);
        },
        error: () => {
          this.message.set('There was an error deleting users');
          this.hasError.set(true);
          setTimeout(() => {
            this.wasSaved.set(false);
          }, 3000);
        },
      });

      
    } else {
      this.message.set("Please select an student to delete")
      this.hasError.set(true);
          setTimeout(() => {
            this.wasSaved.set(false);
          }, 3000);
    }
    this.usersIds = [];
  }
}
