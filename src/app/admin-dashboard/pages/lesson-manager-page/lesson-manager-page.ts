import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { Lesson } from '../../../projects/interfaces/project.interface';
import { LessonService } from '../../../projects/services/LessonService';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Location } from '@angular/common';
import { DynamicSize } from '../../components/dynamic-size/dynamic-size';

@Component({
  selector: 'app-lesson-manager-page',
  imports: [FormsModule, ReactiveFormsModule, DynamicSize],
  templateUrl: './lesson-manager-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonManagerPage {
  lessonService = inject(LessonService);
  activatedRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  // signals

  LessonLoaded = signal<Lesson | null>(null);
  fileUrl = signal<string>('');
  edit = signal(false);
  lessonId: string = this.activatedRoute.snapshot.params['idLesson'];
  unitId: string = this.activatedRoute.snapshot.params['idUnit'];

  constructor(private location: Location) {
    if (this.lessonId != 'create') {
      this.edit.set(true);
      this.lessonService
        .getById(this.lessonId)
        .subscribe((result) => this.LessonLoaded.set(result));

      effect(() => {
        const lesson = this.LessonLoaded();
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
}
