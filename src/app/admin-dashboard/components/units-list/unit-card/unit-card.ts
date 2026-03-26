import { Unit } from './../../../../projects/interfaces/project.interface';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LessonCard } from "./lesson-card/lesson-card";


@Component({
  selector: 'app-unit-card',
  imports: [LessonCard],
  templateUrl: './unit-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitCard {
  unit = input.required<Unit>();
 }
