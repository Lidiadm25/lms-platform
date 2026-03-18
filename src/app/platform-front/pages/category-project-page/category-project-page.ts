import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../projects/services/ProjectService';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PaginationService } from '../../../shared/components/pagination.component/pagination.service';
import { PaginationComponent } from "../../../shared/components/pagination.component/pagination.component";
import { ProjectCard } from "../../../projects/components/project-card/project-card";

@Component({
  selector: 'app-category-project-page',
  imports: [PaginationComponent, ProjectCard],
  templateUrl: './category-project-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryProjectPage { 

  route = inject(ActivatedRoute);
  projectsService = inject(ProjectService);
  paginationService = inject(PaginationService);
  category = toSignal(this.route.params.pipe(map(({ name })=> name)))

  
  projectsResource = rxResource({
    
    params : () =>  ({
      
      category: this.category(),
      page: this.paginationService.currentPage() - 1,
    }),
    stream: ({params }) => {
      return this.projectsService.getProjects({
        category: params.category,
        offset: params.page * 9
      })
    }
  })
  
} 
