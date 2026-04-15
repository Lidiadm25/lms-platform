import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ProjectCard } from "../../../projects/components/project-card/project-card";
import { rxResource } from '@angular/core/rxjs-interop';
import { ProjectService } from '../../../projects/services/ProjectService';
import { PaginationService } from '../../../shared/components/pagination.component/pagination.service';
import { PaginationComponent } from "../../../shared/components/pagination.component/pagination.component";
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-explore-page',
  imports: [ProjectCard, PaginationComponent, FormsModule],
  templateUrl: './explore-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplorePage { 
  router = inject(Router);
  route = inject(ActivatedRoute)
  projectService = inject(ProjectService);
  paginationService = inject(PaginationService)
  query = '';
  search = signal('');
   projectResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1, query: this.search() }),
    stream: ({params}) => {
      if(params.query.length==0) {
        return  this.projectService.getProjects({offset: params.page * 9, limit:9})
      } 
        return this.projectService.getFilteredProjects({offset: params.page * 9, limit: 9}, params.query)
    },
  });
 
  onSearch(){
    
   this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: this.search() || null }, // null removes the param if empty
      queryParamsHandling: 'merge', // keep existing params
      replaceUrl: true // avoid adding to browser history
    });
  }

  reload() {
    this.projectResource.reload();
    this.search.set("a");
  }
  
}
