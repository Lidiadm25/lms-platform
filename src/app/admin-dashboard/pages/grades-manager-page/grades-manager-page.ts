import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Project, Task } from '../../../projects/interfaces/project.interface';
import { Submit } from '../../../projects/interfaces/tasks.interface';
import { ProjectService } from '../../../projects/services/ProjectService';
import { TaskService } from '../../../projects/services/TaskService';
import { ComboboxUnitsLesson } from '../../components/combobox-units-lesson/combobox-units-lesson';
import { GradeTable } from '../../components/grade-table/grade-table';
import { SubmissionVisualizer } from '../../components/submission-visualizer/submission-visualizer';
import { GradeService } from '../../../projects/services/GradeService';

@Component({
  selector: 'app-grades-manager-page',
  imports: [
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    ComboboxUnitsLesson,
    SubmissionVisualizer,
    GradeTable,
    NgClass
],
  templateUrl: './grades-manager-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradesManagerPage {
  project = signal<Project | null>(null);
  projectService = inject(ProjectService);
  activatedRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  projectId: string = this.activatedRoute.snapshot.params['idProject'];
  userId = signal<string>('');
  taskId = signal<string>('');
  submit = signal<Submit | null>(null);
  selectedPdf = signal<string| null>(null)
  task = signal<Task | null>(null)
  taskService = inject(TaskService);
  gradeService = inject(GradeService);

  constructor() {
    effect(() => {
      if (this.taskId() && this.userId()) {
        this.selectedPdf.set(null)
        this.taskService
          .findByUserTask(this.userId(), this.taskId())
          .subscribe((data) => {
            this.submit.set(data)
          });

          this.taskService.getById(this.taskId()).subscribe((data)=> this.task.set(data) )
      }
    });
  }

  openPdf(url:string){
    this.selectedPdf.set(url)
  }
  downloadImage(id:string){
    this.gradeService.downloadFile(id).subscribe({
      next: (response) => {
        window.location.href = response.url;
      },
      error: (err) => {
        console.error(err);
      }
    });
}
}
