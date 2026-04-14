import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { Task } from '../../../projects/interfaces/project.interface';
import { TaskService } from '../../../projects/services/TaskService';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-card',
  imports: [RouterLink],
  templateUrl: './task-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCard {
  taskLoaded = signal<Task | null>(null);
  activatedRoute = inject(ActivatedRoute);
  taskService = inject(TaskService);
  taskId = input.required<string>();
  lessonId = input.required<string>();

  ngOnInit() {
    this.taskService.getById(this.taskId()).subscribe((result) => {
      this.taskLoaded.set(result);
    });
  }
}
