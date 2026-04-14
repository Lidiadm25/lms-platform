import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
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
  edit = signal<boolean>(false);
  wasSaved = signal<boolean>(false);
  hasError = signal<boolean>(false)
  constructor(){
    if(this.taskId != 'create') {
      this.edit.set(true);
      this.taskService
        .getById(this.taskId)
        .subscribe((result) => this.taskLoaded.set(result));

      effect(() => {
        const task = this.taskLoaded();
        if (task) {
         
          // todo ?????????????????????????
         const taskCloseDate = new Date(task.task_close);
         const taskOpenDate = new Date(task.task_open);

          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            task_close: taskCloseDate.toISOString().slice(0,16),
            task_open : taskOpenDate.toISOString().slice(0,16)
            
          });
        }
      });
    }
  }

  

  deleteTask(){
    this.taskService.delete(this.taskId).subscribe((result) => console.log(result))
  }
  onFilesChange( event: any){}
  getSelectedSize(){ return this.taskForm.get('title') as FormControl}

  OnSubmit(){
    
    var task: TaskCreate = {
      ...this.taskForm.value as any,
      lesson: this.lessonId
    }
    
    if(this.taskId == 'create') {
      this.taskService.create(task).subscribe((result) => console.log(result))
    } else {
      this.taskService.update(this.taskId,task).subscribe((result) => result.valueOf()? this.success() : this.error() )
    }
    
 
  }

  success(){
          this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }
  error(){
          this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 3000);
  }

}
