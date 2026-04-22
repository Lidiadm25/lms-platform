import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Submit } from '../../../projects/interfaces/tasks.interface.ts';

@Component({
  selector: 'app-grade-table',
  imports: [ReactiveFormsModule],
  templateUrl: './grade-table.html',
})
export class GradeTable {
  userId = input.required<string>();
  submit = input.required<Submit | null>();
  fb = inject(FormBuilder);

  submitForm = this.fb.group({
    min_range: '',
    max_range: '',
    feedback: '',
    total: '',
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

  onSubmit() {}
}
