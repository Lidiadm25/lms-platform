import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { firstValueFrom } from 'rxjs';
import { Lesson } from '../../../projects/interfaces/project.interface';
import { LessonService } from '../../../projects/services/LessonService';
import { ProjectService } from '../../../projects/services/ProjectService';
import { CourseStateService } from '../../../projects/services/CourseStateService';

@Component({
  selector: 'app-lesson-manager-page',
  imports: [FormsModule, ReactiveFormsModule, QuillModule, RouterLink],
  templateUrl: './lesson-manager-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonManagerPage {
  lessonService = inject(LessonService);
  activatedRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  // signals
  courseStateService = inject(CourseStateService);
  projectService = inject(ProjectService)
  lessonLoaded = signal<Lesson | null>(null);
  files = signal<File[]>([])
  edit = signal(false);
  lessonId = signal<string>('create');
  unitId: string = this.activatedRoute.snapshot.params['idUnit'];
  projectId = signal<string>('');

  constructor(private location: Location) {
    effect(() => {
      this.activatedRoute.parent!.paramMap.subscribe((params) => {
        const id = params.get('idProject') ?? 'create'; // cambiarlo para que te lleve a not found page
        
        this.projectId.set(id);
      });
      this.activatedRoute.paramMap.subscribe((params) => {
        const lesson = params.get('idLesson') ?? 'create';
        this.lessonId.set(lesson);
      });

      if (this.lessonId() != 'create') {
        this.edit.set(true);
        this.lessonService.getById(this.lessonId()).subscribe((result) => {
          this.lessonLoaded.set(result);
          this.lessonForm.patchValue(result);
        });
      } else {
        this.lessonForm.reset();
      }
    });
  }



  lessonForm = this.fb.group({
    title: ['', []],
    description: ['', []],
  });

 
  onFilesChange(event: any) {
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList != null) {
      this.files.set(Array.from(fileList))
    }
  }

  async OnSubmit() {
   
      const lessonLike: Partial<Lesson> = { ...(this.lessonForm.value as any) };
      if (this.edit() == true) {
       
          this.lessonService.updateLesson(this.lessonId(), lessonLike, this.files()).subscribe({
            next: () => {
              this.courseStateService.notifyUpdate();
            },
             error: (err) => {
              console.error('Error updating lesson:', err);
            }
          });
      } else {
        this.lessonService.create(this.unitId, lessonLike, this.files()).subscribe({
          next: () => {
            this.courseStateService.notifyUpdate();
          },
          error: (err) => {
            console.error('Error creating lesson:', err);
          }
        });
      }

      this.wasSaved.set(true);
      setTimeout(() => {
        this.wasSaved.set(false);
      }, 3000);
    
  }


  deleteLesson() {
    this.lessonService.delete(this.lessonId()).subscribe(() => console.log('Lesson deleted'));
    this.location.back();
  }

  wasSaved = signal<boolean>(false);
  hasError = signal<boolean>(false);
  router = inject(Router);
  verifyStatus() {
    if (!this.wasSaved() && this.lessonId() == 'create') {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 3000);
    } else {
      let route: string =
        '/admin/manager/' +
        this.projectId() +
        '/' +
        this.unitId +
        '/' +
        this.lessonId() +
        '/create';
      this.router.navigate([route], { replaceUrl: true });
    }
  }
}
