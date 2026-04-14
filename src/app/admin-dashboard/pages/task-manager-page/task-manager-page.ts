import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DynamicSize } from "../../components/dynamic-size/dynamic-size";
import { Task } from '../../../projects/interfaces/project.interface';
import { TaskCreate } from '../../interfaces/task.interface';
import { TaskService } from '../../../projects/services/TaskService';

@Component({
  selector: 'app-task-manager-page',
  imports: [DynamicSize, ReactiveFormsModule],
  templateUrl: './task-manager-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskManagerPage {
  taskService = inject(TaskService)
  activatedRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder)
  taskId: string = this.activatedRoute.snapshot.params['idTask'];
  lessonId: string = this.activatedRoute.snapshot.params['idLesson'];
  taskLoaded = signal<Task|null>(null);
  taskForm = this.fb.group({
    title: [''],
    description:[''],
    task_open: [''],
    task_close: [''],
  })

  constructor(){
    
  }

  deleteTask(){}
  onFilesChange( event: any){}
  getSelectedSize(){ return this.taskForm.get('title') as FormControl}
  OnSubmit(){
   
    var task: TaskCreate = {
      ...this.taskForm.value as any,
      lesson: this.lessonId
    }
    
    this.taskService.create(task).subscribe((result) => console.log(result))
  }
}
