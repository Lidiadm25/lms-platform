import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Task } from '../../../projects/interfaces/project.interface';
import { TaskCreate } from '../../../projects/interfaces/tasks.interface';
import { TaskService } from '../../../projects/services/TaskService';
import { DynamicSize } from '../../components/dynamic-size/dynamic-size';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-task-manager-page',
  imports: [DynamicSize, ReactiveFormsModule, QuillModule],
  templateUrl: './task-manager-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskManagerPage {
  taskService = inject(TaskService);
  activatedRoute = inject(ActivatedRoute);
  
  router = inject(Router)
  fb = inject(FormBuilder);
  taskId = signal<string>('create');
  lessonId: string = this.activatedRoute.snapshot.params['idLesson'];
  taskLoaded = signal<Task | null>(null);
  projectId = signal<string>('');
  taskForm = this.fb.group({
    title: [''],
    description: [''],
    task_open: [''],
    task_close: [''],
    fileSize: [0],
  });
  edit = signal<boolean>(false);
  wasSaved = signal<boolean>(false);
  hasError = signal<boolean>(false);

  //#region Constructor
  constructor() {
    effect(() => {
      this.activatedRoute.paramMap.subscribe((params) => {
        const id = params.get('idTask') ?? 'create';
        const project = params.get('idProject') ?? 'create';
        this.projectId.set(project)
        this.taskId.set(id);
      });
      if (this.taskId() != 'create') {
        this.edit.set(true);
        this.taskService.getById(this.taskId()).subscribe((result) => {
          this.taskLoaded.set(result);
          const task = this.taskLoaded();
          if (task) {
            const taskCloseDate = new Date(task.task_close);
            const taskOpenDate = new Date(task.task_open);

            this.taskForm.patchValue({
              title: task.title,
              description: task.description,
              task_close: taskCloseDate.toISOString().slice(0, 16),
              task_open: taskOpenDate.toISOString().slice(0, 16),
              fileSize: task.fileSize,
            });
          } else {
            this.taskForm.reset();
          }
        });
      }
    });
  }
  //#endregion

  newTask() {
  this.router.navigate(['../', 'create'], {
    relativeTo: this.activatedRoute,
  });
}

  deleteTask() {
    this.taskService.delete(this.taskId()).subscribe((result) => console.log(result));
  }
  onFilesChange(event: any) {}
  getSelectedSize() {
    return this.taskForm.get('fileSize') as FormControl;
  }

  OnSubmit() {
    var task: TaskCreate = {
      ...(this.taskForm.value as any),
      lesson: this.lessonId,
    };

    console.log(task)

    if (this.taskId() == 'create') {
      this.taskService.create(task).subscribe({
        next: (x) => console.log(x),
        error: (e) => {
          this.hasError.set(true);
          setTimeout(() => {
            this.hasError.set(false);
          }, 3000);
        },
      });
    } else {
      this.taskService.update(this.taskId(), task).subscribe({
        next: (x) => console.log(x),
        error: (e) => {
          this.hasError.set(true);
          setTimeout(() => {
            this.hasError.set(false);
          }, 3000);
        },
      });
    }
    this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }

}
