import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { Lesson } from '../../../../projects/interfaces/project.interface';
import { LessonService } from '../../../../projects/services/LessonService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lesson-accordeon',
  imports: [],
  templateUrl: './lesson-accordeon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonAccordeon {
  lessonId = input.required<string>();
  unitId = input.required<string>();
  lesson = signal<Lesson| null>(null)
  lessonService = inject(LessonService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
   projectId = input.required<string>();
  ngOnInit(){
    this.lessonService.getById(this.lessonId()).subscribe((x)=>this.lesson.set(x) );

   
  }

 

   navigateLesson(){
    this.router.navigateByUrl("/admin/manager/"+this.projectId()+"/"+this.unitId()+"/" +this.lessonId()) 
  }

  navigateTask(id:string){
    this.router.navigateByUrl("/admin/manager/"+this.projectId()+"/"+this.unitId()+"/" +this.lessonId() +"/"+ id, {replaceUrl:true}) 
  }
 }
