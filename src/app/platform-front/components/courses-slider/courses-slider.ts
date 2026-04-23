import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';

import { UserProjectsResponse } from '../../../auth/interfaces/user.interface';
import { ProjectCard } from '../../../projects/components/project-card/project-card';
import { UsersProjectService } from '../../../projects/services/UsersProjectService';



@Component({
  selector: 'app-courses-slider',
  imports: [ProjectCard,],
  templateUrl: './courses-slider.html',
  
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoursesSlider { 

 userProjectService = inject(UsersProjectService)
 projects = signal<UserProjectsResponse | null>(null);
  ngOnInit(){
    this.userProjectService.getProjects()?.subscribe((result) => {
      this.projects.set(result)

    })
  }
}
