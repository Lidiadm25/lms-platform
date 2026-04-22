import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
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
  tap
} from 'rxjs';
import {
  Lesson,
  Project,
  Unit
} from '../../../projects/interfaces/project.interface';
import { LessonService } from '../../../projects/services/LessonService';
import { ProjectService } from '../../../projects/services/ProjectService';

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

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxUnitsLesson {
  projectService = inject(ProjectService);
  projectId = input.required<string>();
  project = signal<Project | null>(null);
  filteredUnits$: Observable<Unit[]> | undefined;
  filteredLessons$: Observable<Lesson[]> | undefined;
  public studentsFilterCtrl: FormControl = new FormControl();
  private unitList: Unit[] = [];
  private nextPage$ = new Subject<void>();
  exFormGroup: any;

  lesson = output<string>();

  lessonService = inject(LessonService);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.projectService.getById(this.projectId()).subscribe((result) => {
      this.project.set(result);
      
      this.getUnitList();
    });

    this.exFormGroup = this.formBuilder.group({
      unitsController: '',
      lessonController: '',
    });

 

    // Note: listen for search text changes
    const filter$ = this.exFormGroup.get('unitsController').valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      filter((q) => typeof q === 'string'),
    );

    this.filteredUnits$ = filter$.pipe(
      switchMap((filter) => {
        //Note: Reset the page with every new seach text
        let currentPage = 1;
        return this.nextPage$.pipe(
          startWith(currentPage),
          // Note: Until the backend responds, ignore NextPage requests.
          exhaustMap((_) => this.getUnitsList(filter, currentPage)),
          tap(() => currentPage++),
          
          takeWhile((p) => p.length > 0),
          scan((allProducts: any, newProducts: any) => allProducts.concat(newProducts), []),
        );
      }),
    );


    const filterLessons$ = this.exFormGroup.get('unitsController').valueChanges.pipe(
    
      startWith(''),
      debounceTime(200),
      filter((value): value is Unit => typeof value === 'object' && value !== null),
      switchMap((unit:Unit)=> this.lessonService.getLessonsByUnit(unit.id)),
      
      
    );
  
       this.filteredLessons$ = filterLessons$
   
    // .pipe(
    //   switchMap((filter) => {
        
    //     let currentPage = 1;
    //     return this.nextPage$.pipe(
    //       startWith(currentPage),
    //       // Note: Until the backend responds, ignore NextPage requests.
    //       exhaustMap((_) => this.getLessonsList(filter, currentPage)),
    //       tap(() => currentPage++),
          
    //       takeWhile((p) => p.length > 0),
    //       scan((allProducts: any, newProducts: any) => allProducts.concat(newProducts), []),
    //     );
    //   }),
    // );

    

  }
    
  // fetchLessons(value: Unit): Observable<Lesson[]>{
  
  //   this.getLessonList(value.id);
  //   return this.lessonService.getLessonsByUnit(value.id);
  // }

  getUnitsList(startsWith: any, page: number): Observable<Unit[]> {
    const take = 3;
    const skip = page > 0 ? (page - 1) * take : 0;
    const filtered = this.unitList.filter((option) =>
      option.title.toLowerCase().startsWith(startsWith.toLowerCase()),
    );
    return of(filtered.slice(skip, skip + take));
  }

  // getLessonsList(startsWith: any, page: number): Observable<Lesson[]> {
  //   const take = 3;
  //   const skip = page > 0 ? (page - 1) * take : 0;
  
    
  //   return of(this.lessonList.slice(skip, skip + take));
  // }

  displayWith(element: any) {
    console.log(element)

    return element ? element.title : null;
  }

  onScroll() {
    //Note: This is called multiple times after the scroll has reached the 80% threshold position.
    this.nextPage$.next();
  }

  getUnitList() {
    // Here, you can call your api if you wants data from backend.
    this.unitList = this.project()!.units;

    // for (let i = 1; i < 100; i++) {
    //   this.unitList.push({ id: i, name: 'Student-' + i })
    // }
  }

  // getLessonList(value : string){
  //   this.lessonService.getLessonsByUnit(value).subscribe((result)=>{
  //     this.lessonList = result;
      
  //   })
  // }

  emitLesson(id: string) {
    this.lesson.emit(id);
  }
}
