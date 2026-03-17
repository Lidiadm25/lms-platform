import { ChangeDetectionStrategy, Component, computed, inject, resource, signal } from '@angular/core';



import { ProjectList } from '../../../projects/components/project-list/project-list';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProjectService } from '../../../projects/services/ProjectService';


@Component({
  selector: 'app-projects-page',
  imports: [ProjectList],
  templateUrl: './projects-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage { 

  projectService = inject(ProjectService);
  query = signal('');

  projectResource = rxResource({
    params: () => 'project-loader',
    stream: () => this.projectService.getProjects(),
    
  })

}