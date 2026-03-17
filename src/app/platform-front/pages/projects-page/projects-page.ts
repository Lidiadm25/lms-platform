import { ChangeDetectionStrategy, Component, computed, inject, resource, signal } from '@angular/core';



import { ProjectList } from '../../../projects/components/project-list/project-list';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProjectService } from '../../../projects/services/ProjectService';
import { PaginationService } from '../../../shared/components/pagination.component/pagination.service';
import { PaginationComponent } from "../../../shared/components/pagination.component/pagination.component";


@Component({
  selector: 'app-projects-page',
  imports: [ProjectList, PaginationComponent],
  templateUrl: './projects-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage { 

  projectService = inject(ProjectService);
  paginationService = inject(PaginationService)

  projectResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1 }),
    stream: ({params}) => {
     return  this.projectService.getProjects({offset: params.page * 9})
    },
  });

}