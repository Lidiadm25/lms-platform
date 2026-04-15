import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { Lesson } from '../../../projects/interfaces/project.interface';
import { LessonService } from '../../../projects/services/LessonService';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Location } from '@angular/common';
import { DynamicSize } from '../../components/dynamic-size/dynamic-size';
import { TaskCard } from "../../components/task-card/task-card";

@Component({
  selector: 'app-lesson-manager-page',
  imports: [FormsModule, ReactiveFormsModule, DynamicSize, TaskCard],
  templateUrl: './lesson-manager-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonManagerPage {
  lessonService = inject(LessonService);
  activatedRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  // signals
  
  lessonLoaded = signal<Lesson | null>(null);
  fileUrl = signal<string>('');
  edit = signal(false);
  lessonId: string = this.activatedRoute.snapshot.params['idLesson'];
  unitId: string = this.activatedRoute.snapshot.params['idUnit'];

  constructor(private location: Location) {
    if (this.lessonId != 'create') {
      this.edit.set(true);
      this.lessonService
        .getById(this.lessonId)
        .subscribe((result) => this.lessonLoaded.set(result));

      effect(() => {
        const lesson = this.lessonLoaded();
        if (lesson) {
          this.lessonForm.patchValue(lesson);
        }
      });
    }
  }

  file: File | undefined = undefined;

  lessonForm = this.fb.group({
    title: ['', []],
    description: ['', []],
    maxSize: [''],
  });

  getSelectedSize(): FormControl {
    return this.lessonForm.get('maxSize') as FormControl;
  }
  onFilesChange(event: any) {
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList != null) {
      this.file = fileList[0];
      this.fileUrl.set(URL.createObjectURL(this.file));
    }
  }

  async OnSubmit() {
    if (this.verifySize(this.file, this.lessonForm.value.maxSize)) {
      const lessonLike: Partial<Lesson> = { ...(this.lessonForm.value as any) };
      if (this.edit()) {
        await firstValueFrom(this.lessonService.updateLesson(this.lessonId, lessonLike, this.file));
      } else {
        await firstValueFrom(this.lessonService.create(this.unitId, lessonLike, this.file));
      }

       this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
    }
  }

  verifySize(file: File | undefined, size: string | null | undefined): boolean {
    if (file == undefined) {
      return true;
    }

    if (size == null || (size != null && file.size > +size)) {
      console.log('error, file size is over max size');
      return false;
    } else {
      return true;
    }
  }
  deleteLesson() {
    this.lessonService.delete(this.lessonId).subscribe(() => console.log('Lesson deleted'));
    this.location.back();
  }

  wasSaved = signal<boolean>(false);
  hasError = signal<boolean>(false)
  router = inject(Router)
  verifyStatus() {
    if (!this.wasSaved() && this.lessonId == 'create') {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 3000);
    } else {
      let route: string = '/admin/tasks-manager/' + this.lessonId + '/create';
      this.router.navigate([route], { replaceUrl: true });
    }
  }
}
