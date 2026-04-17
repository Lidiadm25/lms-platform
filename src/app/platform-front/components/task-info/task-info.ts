import { Component, input } from '@angular/core';
import { Task } from '../../../projects/interfaces/project.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-info',
  imports: [DatePipe],
  templateUrl: './task-info.html',
  

})
export class TaskInfo {
  task = input.required<Task | null>();
 }
