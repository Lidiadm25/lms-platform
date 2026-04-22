import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatOption } from "@angular/material/autocomplete";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, exhaustMap, filter, Observable, of, scan, startWith, Subject, switchMap, takeWhile, tap } from 'rxjs';
import { Project, Unit } from '../../../projects/interfaces/project.interface';
import { ProjectService } from '../../../projects/services/ProjectService';
import { ComboboxUnitsLesson } from "../../components/combobox-units-lesson/combobox-units-lesson";
import { ListUsers } from "../../components/list-users/list-users";
import { SubmissionVisualizer } from "../../components/submission-visualizer/submission-visualizer";
import { GradeTable } from "../../components/grade-table/grade-table";
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
  submitId = signal<string>('');

  ngOnInit(): void {
   
    }
    

}




