import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Grade } from '../../../projects/interfaces/grade.interface';
import { Submit } from '../../../projects/interfaces/tasks.interface';
import { GradeService } from '../../../projects/services/GradeService';
import { catchError, of } from 'rxjs';
import { Task } from '../../../projects/interfaces/project.interface';

@Component({
  selector: 'app-grade-table',
  imports: [ReactiveFormsModule],
  templateUrl: './grade-table.html',
})
export class GradeTable {
  userId = input.required<string>();
  submit = input.required<Submit | null>();
  fb = inject(FormBuilder);
  gradeService = inject(GradeService);
  submitForm = this.fb.group({
    min_range: 0,
    max_range: 0,
    feedback: '',
    total: 0,
  });

  messageError = signal<string>('There was an error');
  task = input<Task | null>(null);
  wasSaved = signal<boolean>(false);
  hasError = signal<boolean>(false);
  edit = signal<boolean>(false);
  grade = signal<Grade | null>(null);

  constructor() {
    effect(() => {
      var disabled = !this.submit();
       let close = new Date(this.task()!.task_close)
      if (close > new Date() && this.submit()!.date_send == null) {
        disabled = true;
        this.messageError.set('The task is still open');
        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
        }, 3000);
      } else {
        disabled = false;
      }
      Object.values(this.submitForm.controls).forEach((control) => {
        if (disabled) {
          control.disable({ emitEvent: false });
        } else {
          control.enable({ emitEvent: false });
        }
      });

      if (!disabled) {
        this.gradeService.getGradeFromSubmit(this.submit()!.id).subscribe((result) => {
          this.grade.set(result);
          this.edit.set(true);
          this.submitForm.patchValue(result);
        });
      }
    });
  }

  onSubmit() {
    const gradeLike: Grade = {
      ...(this.submitForm.value as any),
      taskSubmitId: this.submit()!.id,
    };

    var resultados;

    this.edit()
      ? (resultados = this.gradeService.updateGrade(gradeLike, this.grade()!.id))
      : (resultados = this.gradeService.create(gradeLike));

    resultados.pipe(catchError((error: any) => this.launchError())).subscribe((result) => {
      this.wasSaved.set(true);
      setTimeout(() => {
        this.wasSaved.set(false);
      }, 3000);
    });
  }

  launchError() {
    this.messageError.set("There was an error.")
    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 3000);

    return of(false);
  }
}
