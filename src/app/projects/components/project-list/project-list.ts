import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProjectsResponse } from '../../interfaces/project.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-project-list',
  imports: [RouterLink],
  templateUrl: './project-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectList { 

  projects = input.required<ProjectsResponse>();

  
}
