import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Lesson } from '../../../../../projects/interfaces/project.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lesson-card',
  imports: [RouterLink],
  templateUrl: './lesson-card.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonCard {
  lesson = input.required<Lesson>();
 }
