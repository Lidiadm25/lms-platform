import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-size',
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-size.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSize {

  @Input() control !: FormControl;
 }
