import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Project } from '../../../projects/interfaces/project.interface';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../projects/services/ProjectService';
import { map } from 'rxjs';

@Component({
  selector: 'app-project-details',
  imports: [],
  templateUrl: './project-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetails {

  route = inject(ActivatedRoute);
  projectsService = inject(ProjectService);
  idProject = toSignal(this.route.params.pipe(map(({ idProject })=> idProject)))
  
    projectResource = rxResource({
      params: () =>  ({
      id: this.idProject(),
    }),
  
    stream: ({params }) => {
      return this.projectsService.getById(params.id)
  }})

  
} 