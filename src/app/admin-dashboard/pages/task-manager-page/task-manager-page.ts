import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, switchMap, filter, of } from 'rxjs';
import { Task } from '../../../projects/interfaces/project.interface';
import { TaskCreate } from '../../../projects/interfaces/tasks.interface';
import { TaskService } from '../../../projects/services/TaskService';
import { DynamicSize } from '../../components/dynamic-size/dynamic-size';
import { QuillModule } from 'ngx-quill';
import { CourseStateService } from '../../../projects/services/CourseStateService';

@Component({
  selector: 'app-task-manager-page',
  imports: [DynamicSize, ReactiveFormsModule, QuillModule],
  templateUrl: './task-manager-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskManagerPage implements OnInit {
  taskService = inject(TaskService);
  activatedRoute = inject(ActivatedRoute);
  courseStateService = inject(CourseStateService);
  router = inject(Router);
  fb = inject(FormBuilder);
  destroyRef = inject(DestroyRef);

  taskId = signal<string>('create');
  projectId = signal<string>('');
  lessonId: string = this.activatedRoute.snapshot.params['idLesson'];
  
  taskLoaded = signal<Task | null>(null);
  edit = signal<boolean>(false);
  wasSaved = signal<boolean>(false);
  hasError = signal<boolean>(false);

  taskForm = this.fb.group({
    title: [''],
    description: [''],
    task_open: [''],
    task_close: [''],
    fileSize: [0],
  });

  ngOnInit() {
    // Escuchamos los cambios en la ruta de forma reactiva y limpia
    combineLatest([
      this.activatedRoute.paramMap,
      this.activatedRoute.parent!.paramMap
    ]).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(([params, parentParams]) => {
        const idTask = params.get('idTask') ?? 'create';
        const idProject = parentParams.get('idProject') ?? 'create';

        this.taskId.set(idTask);
        this.projectId.set(idProject);
        this.edit.set(idTask !== 'create');

        // Si es edición, pedimos los datos; si no, devolvemos null
        if (idTask !== 'create') {
          return this.taskService.getById(idTask);
        } else {
          this.taskForm.reset();
          return of(null);
        }
      })
    ).subscribe(task => {
      if (task) {
        this.taskLoaded.set(task);
        const taskCloseDate = new Date(task.task_close);
        const taskOpenDate = new Date(task.task_open);

        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          task_close: taskCloseDate.toISOString().slice(0, 16),
          task_open: taskOpenDate.toISOString().slice(0, 16),
          fileSize: task.fileSize,
        });
      }
    });
  }

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
    const task: TaskCreate = {
      ...(this.taskForm.value as any),
      lesson: this.lessonId,
      idProject: this.projectId()
    };

    const action$ = this.taskId() === 'create' 
      ? this.taskService.create(task) 
      : this.taskService.update(this.taskId(), task);

    action$.subscribe({
      next: () => {
        // Notificamos al padre (ManagerPage) para que recargue el acordeón
        this.courseStateService.notifyUpdate();
        
        this.wasSaved.set(true);
        setTimeout(() => this.wasSaved.set(false), 3000);
      },
      error: (e) => {
        console.log(e);
        this.hasError.set(true);
        setTimeout(() => this.hasError.set(false), 3000);
      },
    });
  }
}