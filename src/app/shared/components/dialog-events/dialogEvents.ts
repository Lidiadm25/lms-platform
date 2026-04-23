import { Component, effect, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { TaskService } from '../../../projects/services/TaskService';
import { DatePipe } from '@angular/common';
import { LessonService } from '../../../projects/services/LessonService';
import { Tree } from '../../../projects/interfaces/project.interface';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-dialog-events',
  imports: [MatDialogContent, DatePipe, RouterLink, MatDialogClose],
  templateUrl: './dialogEvents.html',

})
export class DialogEvents { 
  data = inject(MAT_DIALOG_DATA)

  lessonService = inject(LessonService)
  taskService = inject(TaskService)
  status = signal<string>('PENDING');
  start = signal<Date>(new Date())
  end = signal<Date>(new Date())

  projectInfo = signal<Tree | null>(null)

  ngOnInit(){
    // Datos de la tarea
    
    this.taskService.getSubmission(this.data.id).subscribe((result)=>{
      
      if(result.date_send !=null){
        this.status.set ("DELIVERED")
      }
      this.start.set(new Date(this.data.start))
      this.end.set(new Date(this.data.end))
      
    });

    // Tree data
    this.lessonService.getTree(this.data.lesson_id).subscribe((result) => {
    
      this.projectInfo.set(result);

    })

  }


  constructor(){
    effect(()=>{
      const info= this.projectInfo();
 
      
    })
  }
}
