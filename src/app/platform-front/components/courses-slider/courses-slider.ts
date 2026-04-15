import { ProjectsResponse } from './../../../projects/interfaces/project.interface';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';

import { UsersProjectService } from '../../../projects/services/UsersProjectService';
import { ProjectCard } from '../../../projects/components/project-card/project-card';



@Component({
  selector: 'app-courses-slider',
  imports: [ProjectCard,],
  templateUrl: './courses-slider.html',
  
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoursesSlider { 

 userProjectService = inject(UsersProjectService)
 projects = signal<ProjectsResponse | null>(null);
  ngOnInit(){
    this.userProjectService.getProjects()?.subscribe((result) => this.projects.set(result))
  }
}
