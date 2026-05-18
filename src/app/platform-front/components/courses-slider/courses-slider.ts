import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';

import { UserProjectsResponse } from '../../../auth/interfaces/user.interface';
import { ProjectCard } from '../../../projects/components/project-card/project-card';
import { UsersProjectService } from '../../../projects/services/UsersProjectService';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-courses-slider',
  imports: [ProjectCard,RouterLink],
  templateUrl: './courses-slider.html',
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoursesSlider { 
 in = signal<boolean>(false);
 userProjectService = inject(UsersProjectService)
 projects = signal<UserProjectsResponse | null>(null);
  ngOnInit(){
    this.userProjectService.getProjects()?.subscribe((result) => {
      this.projects.set(result)
      this.in.set(true)
    })
  }
}
