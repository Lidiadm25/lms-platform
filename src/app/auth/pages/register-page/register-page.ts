import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/authService';
import { equivalentValidator } from '../../validators/passwordMatchingValidator';
import { FormErrorLabel } from "../../../shared/components/form-error-label/form-error-label";


@Component({
  selector: 'app-register-page',
  imports: [ ReactiveFormsModule],
  templateUrl: './register-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  
  router = inject(Router);
  fb = inject(FormBuilder);

  hasError = signal(false)
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    name: ['',[Validators.required, Validators.minLength(6)]],
  }, {
    Validators: [equivalentValidator('password','confirmPassword')]
  });

  authService = inject(AuthService);

  

  OnSubmit() {
    this.registerForm.markAllAsTouched()
    const { email = '', password = '', name= '' } = this.registerForm.value;
    this.authService.register(email!, password!, name!).subscribe((isAuthenticated) => {
      if (isAuthenticated && this.authService.isAdmin()) {
        this.router.navigateByUrl('/admin')
        return;

      } else if(isAuthenticated) {
        this.router.navigateByUrl('/')
        return;
      }

        this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    });

   
 
  }
 }
