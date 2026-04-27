import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../projects/services/LessonService';
import { Lesson } from '../../../projects/interfaces/project.interface';

@Component({
  selector: 'app-lesson-view-page',
  imports: [],
  templateUrl: './lesson-view-page.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonViewPage {
  activatedRoute = inject(ActivatedRoute);
  lessonId = this.activatedRoute.snapshot.params['idLesson'];
  lessonService = inject(LessonService)
  lesson = signal<Lesson|null>(null)
  ngOnInit(){
    this.lessonService.getById(this.lessonId).subscribe((result)=>(this.lesson.set(result)))
  }
 }
