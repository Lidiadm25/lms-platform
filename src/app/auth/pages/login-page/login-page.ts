import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [RouterOutlet],
  templateUrl: './login-page-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage { }
