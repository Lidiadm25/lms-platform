import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { Lesson } from '../../../../projects/interfaces/project.interface';
import { LessonService } from '../../../../projects/services/LessonService';

@Component({
  selector: 'app-lesson-accordeon',
  imports: [],
  templateUrl: './lesson-accordeon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonAccordeon {
  lessonId = input.required<string>();
  lesson = signal<Lesson| null>(null)
  lessonService = inject(LessonService)
  ngOnInit(){
    this.lessonService.getById(this.lessonId()).subscribe((x)=>this.lesson.set(x) )
  }
 }
