import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../projects/interfaces/project.interface';
import { ProjectService } from '../../../projects/services/ProjectService';
import { ComboboxUnitsLesson } from "../../components/combobox-units-lesson/combobox-units-lesson";
import { GradeTable } from "../../components/grade-table/grade-table";
import { ListUsers } from "../../components/list-users/list-users";
import { SubmissionVisualizer } from "../../components/submission-visualizer/submission-visualizer";
import { TaskService } from '../../../projects/services/TaskService';
import { Submit } from '../../../projects/interfaces/tasks.interface.ts';
@Component({
  selector: 'app-grades-manager-page',
  imports: [MatAutocompleteModule, ReactiveFormsModule, MatInputModule, ComboboxUnitsLesson, ListUsers, SubmissionVisualizer, GradeTable],
  templateUrl: './grades-manager-page.html',
  styleUrl:'./styles.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})

export class GradesManagerPage {

  project = signal<Project | null>(null);
  projectService = inject(ProjectService);
  activatedRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder)
  projectId: string = this.activatedRoute.snapshot.params['idProject'];
  userId = signal<string>('');
  taskId = signal<string>('');
  submit = signal<Submit | null>(null)

  taskService = inject(TaskService)

  constructor(){
    effect(()=>{
      if(this.taskId() && this.userId()) {
        this.taskService.findByUserTask(this.userId(), this.taskId()).subscribe((x)=> this.submit.set(x))
      }
    })
  }
    
  submitGrades(){

  }
}




