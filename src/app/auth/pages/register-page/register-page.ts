import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/authService';
import { equivalentValidator } from '../../validators/passwordMatchingValidator';
import { FormErrorLabel } from "../../../shared/components/form-error-label/form-error-label";


@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './register-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  
  router = inject(Router);
  fb = inject(FormBuilder);
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
    const { email = '', password = '', name= '' } = this.registerForm.value;
    console.log(email, password, name)
    this.authService.register(email!, password!, name!).subscribe((isAuthenticated) => {
      if (isAuthenticated && this.authService.isAdmin()) {
        this.router.navigateByUrl('/admin')

      } else if(isAuthenticated) {
        this.router.navigateByUrl('/')
      }
    });
  }
 }
