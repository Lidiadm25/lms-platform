import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatOption } from '@angular/material/autocomplete';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  Observable,
  Subject,
  debounceTime,
  exhaustMap,
  filter,
  of,
  scan,
  startWith,
  switchMap,
  takeWhile,
  tap,
} from 'rxjs';
import { Lesson, Project, Task, Unit } from '../../../projects/interfaces/project.interface';
import { LessonService } from '../../../projects/services/LessonService';
import { ProjectService } from '../../../projects/services/ProjectService';
import { TaskService } from '../../../projects/services/TaskService';
import { UsersProjectService } from '../../../projects/services/UsersProjectService';
import { User, UserProject } from './../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-combobox-units-lesson',
  imports: [
    MatAutocompleteModule,
    MatOption,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    AsyncPipe,
    MatInputModule,
  ],
  templateUrl: './combobox-units-lesson.html',


})
export class ComboboxUnitsLesson {
  projectService = inject(ProjectService);
  projectId = input.required<string>();
  project = signal<Project | null>(null);
  filteredUnits$: Observable<Unit[]> | undefined;
  filteredStudents$: Observable<UserProject[]> | undefined;
  filteredLessons$: Observable<Lesson[]> | undefined;
  filteredTasks$: Observable<Task[]> | undefined;

  private unitList: Unit[] = [];
  private studentList: UserProject[] = [];
  private nextPage$ = new Subject<void>();
  exFormGroup: any;

  task = output<string>();
  student = output<string>();

  lessonService = inject(LessonService);
  taskService = inject(TaskService);
  userService = inject(UsersProjectService);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.projectService.getById(this.projectId()).subscribe((result) => {
      this.project.set(result);

      this.getUnitList();
      this.getStudentList();
    });

    this.exFormGroup = this.formBuilder.group({
      unitsController: '',
      lessonController: '',
      taskController: '',
      studentsController:'',
    });

   
    const filter$ = this.exFormGroup.get('unitsController').valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      filter((q) => typeof q === 'string'),
    );

    this.filteredUnits$ = filter$.pipe(
      switchMap((filter) => {
        let currentPage = 1;
        return this.nextPage$.pipe(
          startWith(currentPage),

          exhaustMap((_) => this.getUnitsList(filter, currentPage)),
          tap(() => currentPage++),

          takeWhile((p) => p.length > 0),
          scan((allProducts: any, newProducts: any) => allProducts.concat(newProducts), []),
        );
      }),
    );

   

    const filterLessons$ = this.exFormGroup.get('unitsController').valueChanges.pipe(
      startWith(''),
      debounceTime(500),
     
      filter((value): value is Unit => typeof value === 'object' && value !== null),
      switchMap((unit: Unit) => this.lessonService.getLessonsByUnit(unit.id)),
    );
    
    this.filteredLessons$ = filterLessons$;

    const filterTask$ = this.exFormGroup.get('lessonController').valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      filter((value): value is Lesson => typeof value === 'object' && value !== null),
      switchMap((lesson: Lesson) => this.taskService.getByLessonId(lesson.id)),
    
    );

    this.filteredTasks$ = filterTask$;

     const filterStudents$ = this.exFormGroup.get('studentsController').valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      filter((q) => typeof q === 'string'),
      switchMap((name: string)=> this.getUsersList(name))
    );

    this.filteredStudents$ = filterStudents$;
    
  }

  getUnitsList(startsWith: any, page: number): Observable<Unit[]> {
    
    const filtered = this.unitList.filter((option) =>
      option.title.toLowerCase().startsWith(startsWith.toLowerCase()),
    );
    return of(filtered);
  }

  getUsersList(startsWith: any): Observable<UserProject[]> {

    const filtered = this.studentList.filter((option) =>
      option.user.fullName.toLowerCase().startsWith(startsWith.toLowerCase()),
    );
  
    return of(filtered);
  }

  displayWith(element: any) {
  

    return element ? element.title : null;
  }

  displayName(element: any) {


    return element ? element.user.fullName : null;
  }

  onScroll() {
    this.nextPage$.next();
  }

  getUnitList() {
    this.unitList = this.project()!.units;
  }

  getStudentList() {
    this.userService.getAll(this.projectId()).subscribe((result) => {
      this.studentList = result;
      
    });
  }

  emitTask(id: string) {
    
    this.task.emit(id);
  }

  emitStudent(id: any) {
    
    this.student.emit(id);
  }
}
