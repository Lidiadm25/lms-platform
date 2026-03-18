import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProjectCard } from "../../../projects/components/project-card/project-card";
import { rxResource } from '@angular/core/rxjs-interop';
import { ProjectService } from '../../../projects/services/ProjectService';
import { PaginationService } from '../../../shared/components/pagination.component/pagination.service';
import { PaginationComponent } from "../../../shared/components/pagination.component/pagination.component";

@Component({
  selector: 'app-home-page',
  imports: [ProjectCard, PaginationComponent],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage { 

  projectService = inject(ProjectService);
  paginationService = inject(PaginationService)

   projectResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1 }),
    stream: ({params}) => {
     return  this.projectService.getProjects({offset: params.page * 9})
    },
  });

  onSearch(query:string){
    console.log("entra en metodo")
    this.projectResource = rxResource({
     params: () => ({ page: this.paginationService.currentPage() - 1, query }),
    stream: ({params}) => {
     return  this.projectService.getFilteredProjects({offset: params.page * 9}, params.query)
    },
  });
  }
}
