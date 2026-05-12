import { CategoryService } from './../../../auth/services/CategoryService';
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
  search = signal(' ');
  selectedCategory=signal<string>('');

  categoryService = inject(CategoryService)

  categoryResource = rxResource({
    stream: ()=> {
      return this.categoryService.getCategories()
    }
  }) 

  setCategory(event:Event){
    
    this.selectedCategory.set((event.target as HTMLSelectElement).value)
   
    console.log(this.selectedCategory())
     this.projectResource.reload();
  }

   projectResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1, query: this.search() , category: this.selectedCategory()}),
    stream: ({params}) => {
      if(params.query.length > 0 || params.category.length>0) {
        return this.projectService.getFilteredProjects({offset: params.page * 6, limit: 6, category: params.category}, params.query)
      } else  {
        return  this.projectService.getProjects({offset: params.page * 6, limit:6})
      }
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
   
  }
  
}
