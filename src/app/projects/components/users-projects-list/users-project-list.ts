import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { UsersProjectResponse } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-users-project-list',
  imports: [],
  templateUrl: './users-project-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersProjectList {
  users = input.required<UsersProjectResponse>();
  selectedAll = signal(false);

  toggleAll(event: any) {
   
 
    let checkboxes = document.querySelectorAll('input');
    event.target.checked ? this.selectedAll.set(true) : this.selectedAll.set(false)
   
    checkboxes.forEach((element) => {
      if (element.name == 'cb' && this.selectedAll() == true) {
      
        element.checked = true;
      } else if (element.name == 'cb' && this.selectedAll() == false) {
        element.checked = false;
      }
    });

  }
}
