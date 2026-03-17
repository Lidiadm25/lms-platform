import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project, ProjectsResponse } from '../../interfaces/project.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationComponent } from "../../../shared/components/pagination.component/pagination.component";

@Component({
  selector: 'app-project-list',
  imports: [],
  templateUrl: './project-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectList { 

  projects = input.required<ProjectsResponse>();

  
}
