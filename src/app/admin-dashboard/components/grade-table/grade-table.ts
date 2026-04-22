import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-grade-table',
  imports: [],
  templateUrl: './grade-table.html',
  styleUrl: './grade-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradeTable {
  userId = input.required<string>();
  submit = input.required<string>();
 }
