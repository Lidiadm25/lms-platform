import { Component, inject, input, signal } from '@angular/core';
import { Grade } from '../../../projects/interfaces/grade.interface';
import { Submit } from '../../../projects/interfaces/tasks.interface';
import { GradeService } from '../../../projects/services/GradeService';

@Component({
  selector: 'app-submit-info',
  imports: [],
  templateUrl: './submit-info.html',
})
export class SubmitInfo {
  submit = input.required<Submit | null>();

  gradeService = inject(GradeService);
  grade = signal<Grade | null>(null);
  statusSubmission = signal<string>('Delivered');
  ngOnChanges() {
    if (this.submit()) {
      this.gradeService.getGradeFromSubmit(this.submit()!.id).subscribe((x) => this.grade.set(x));
    } else {
      this.statusSubmission.set('Not delivered');
      this.grade.set({
        total: 0,
        feedback: 'No available feedback',
      } as Grade);
    }
  }
}
