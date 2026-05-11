import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../../../projects/interfaces/project.interface';

@Component({
  selector: 'app-units-lessons-accordeon',
  imports: [],
  templateUrl: './units-lessons-accordeon.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsLessonsAccordeon {
  project = input.required<Project | null>();
}
