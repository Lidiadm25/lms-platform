import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project, ProjectsResponse } from '../../interfaces/project.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationComponent } from "../../../shared/components/pagination.component/pagination.component";
import { RouterLink } from "@angular/router";
import { UsersProjectResponse } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-users-project-list',
  imports: [RouterLink],
  templateUrl: './users-project-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersProjectList { 

  users = input.required<UsersProjectResponse>();

  
}
