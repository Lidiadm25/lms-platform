import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './Settings.html',
  styleUrl: './Settings.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings { }
