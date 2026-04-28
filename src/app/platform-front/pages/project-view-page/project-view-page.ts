import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Project } from '../../../projects/interfaces/project.interface';
import { ProjectService } from '../../../projects/services/ProjectService';


@Component({
  selector: 'app-project-view-page',
  imports: [RouterLink],
  templateUrl: './project-view-page.html',
 
})
export class ProjectViewPage {
  activatedRoute = inject(ActivatedRoute)
  projectId = this.activatedRoute.snapshot.params['idProject'];
  project= signal<Project | null>( null);
  
  projectService = inject(ProjectService);

  ngOnInit(){
    this.projectService.getById(this.projectId).subscribe((z)=> this.project.set(z))
  }

 }
