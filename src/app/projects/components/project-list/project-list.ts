import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../../interfaces/project.interface';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-project-list',
  imports: [],
  templateUrl: './project-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectList { 

  projects = input.required<Project[]>();

  
}
