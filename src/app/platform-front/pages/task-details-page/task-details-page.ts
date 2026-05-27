import { Component, inject, signal } from '@angular/core';
import { TaskInfo } from '../../components/task-info/task-info';
import { TaskService } from './../../../projects/services/TaskService';

import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../projects/interfaces/project.interface';
import { Submit } from '../../../projects/interfaces/tasks.interface';
import { SubmitForm } from '../../components/submit-form/submit-form';
import { SubmitInfo } from '../../components/submit-info/submit-info';

@Component({
  selector: 'app-task-details-page',
  imports: [TaskInfo, SubmitForm, SubmitInfo],
  templateUrl: './task-details-page.html',
})
export class TaskDetailsPage {
  activatedRoute = inject(ActivatedRoute);
  idTask: string = this.activatedRoute.snapshot.params['idTask'];

  taskService = inject(TaskService);
  task = signal<Task | null>(null);
  submit = signal<Submit | null> (null);
  status = signal<string>('Submit the task');
  isActive = signal<boolean>(false);

  ngOnInit(){

    this.taskService.getById(this.idTask).subscribe((result) => {
      console.log(result);
      console.log(this.idTask);
      this.task.set(result)
      this.verifyStatus();
       this.taskService.getSubmissionByTask(this.idTask).subscribe((result) =>  {
       console.log(result);
      this.submit.set(result)
      if(this.isActive() == false || (this.isActive()== true && this.submit() != null && this.submit()?.date_send !=null)) 
      {
        this.status.set("Submission info")

      }
       });
    });
   
   

  }

  verifyStatus(){
    let open = new Date(this.task()!.task_open)
    let close = new Date(this.task()!.task_close)
    let now = new Date();

   (now > close || now < open)? this.isActive.set(false) : this.isActive.set(true);
    
  }

}
