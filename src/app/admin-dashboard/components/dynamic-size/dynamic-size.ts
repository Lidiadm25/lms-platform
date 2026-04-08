import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-size',
  imports: [],
  templateUrl: './dynamic-size.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSize { }
