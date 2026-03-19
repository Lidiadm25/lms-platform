import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UsersProjectResponse } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-users-project-list',
  imports: [],
  templateUrl: './users-project-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersProjectList { 

  users = input.required<UsersProjectResponse>();

  
}
