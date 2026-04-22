import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Submit } from '../../../projects/interfaces/tasks.interface.ts';

@Component({
  selector: 'app-submit-info',
  imports: [],
  templateUrl: './submit-info.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitInfo { 
  submit = input.required<Submit | null>();
}
