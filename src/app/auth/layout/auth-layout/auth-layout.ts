import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  templateUrl: './auth-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayout {
  router = inject(Router);
  public actualRoute = signal<string>('');
  public title = signal<string>('');

  constructor() {
    effect(() => {
      if (this.actualRoute() == '/auth/login') {
        this.title.set('Sign in to your account');
      } else {
        this.title.set('Sign up to your account');
      }
    });
  }

  ngAfterContentChecked() {
    this.actualRoute.set(this.router.url);
  }
}
