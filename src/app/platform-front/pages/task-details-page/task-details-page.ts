import { TaskService } from './../../../projects/services/TaskService';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { TaskInfo } from '../../components/task-info/task-info';

import { Task } from '../../../projects/interfaces/project.interface';
import { SubmitForm } from '../../components/submit-form/submit-form';
import { SubmitInfo } from '../../components/submit-info/submit-info';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-details-page',
  imports: [TaskInfo, SubmitForm, SubmitInfo],
  templateUrl: './task-details-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailsPage {
  activatedRoute = inject(ActivatedRoute);
  idTask: string = this.activatedRoute.snapshot.params['idTask'];

  taskService = inject(TaskService);
  task = signal<Task | null>(null);

  ngOnInit(){
    this.taskService.getById(this.idTask).subscribe((result) => this.task.set(result));
    //this.taskService.getSubmission()
  }

}
