import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GradeCreate } from '../../../projects/interfaces/grade.interface';
import { Submit } from '../../../projects/interfaces/tasks.interface';
import { GradeService } from '../../../projects/services/GradeService';

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

  constructor() {
    effect(() => {
      const disabled = !this.submit();

      Object.values(this.submitForm.controls).forEach((control) => {
        if (disabled) {
          control.disable({ emitEvent: false });
        } else {
          control.enable({ emitEvent: false });
        }
      });
    });
  }

  onSubmit() {
    const gradeLike: GradeCreate = {
      ...(this.submitForm.value as any),
      taskSubmitId: this.submit()!.id,
    };
    this.gradeService.create(gradeLike).subscribe((x) => console.log(x));
  }
}
