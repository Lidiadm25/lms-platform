import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { UsersProjectService } from '../../../projects/services/UsersProjectService';
import { UsersProjectList } from "../../../projects/components/users-projects-list/users-project-list";
import { PaginationService } from '../../../shared/components/pagination.component/pagination.service';

@Component({
  selector: 'app-users-project-page',
  imports: [UsersProjectList],
  templateUrl: './users-project-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersProjectPage {

  usersProjectsService= inject(UsersProjectService);
  activatedRoute = inject(ActivatedRoute);
  projectId = this.activatedRoute.snapshot.params['idProject'];
  paginationService = inject(PaginationService)

  userProjectResource = rxResource({
    params: () => ({projectId: this.projectId, page: this.paginationService.currentPage() - 1}),
    stream: ({params}) => 
      this.usersProjectsService.getUsers(params.projectId, {offset: params.page * 9})

  })

 }
