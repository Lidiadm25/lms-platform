import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  router = inject(Router);
  fb = inject(FormBuilder);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  hasError = signal(false);
  authService = inject(AuthService);


  OnSubmit() {
    this.loginForm.markAllAsTouched();
   

    const { email, password } = this.loginForm.value;
    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      if (isAuthenticated && this.authService.isAdmin()) {
       // this.socketService.requestConnected();
        this.router.navigateByUrl('/admin');
      } else if (isAuthenticated) {
        this.router.navigateByUrl('/home');
       // this.socketService.requestConnected();
      }
    });
  }
}
