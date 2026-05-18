import { Component, input } from '@angular/core';
import { Task } from '../../../projects/interfaces/project.interface';
import { DatePipe } from '@angular/common';
import { SafeHTMLPipe } from '../../../pipes/safeHTML-pipe';

@Component({
  selector: 'app-task-info',
  imports: [DatePipe,SafeHTMLPipe],
  templateUrl: './task-info.html',
  

})
export class TaskInfo {
  task = input.required<Task | null>();
 }
