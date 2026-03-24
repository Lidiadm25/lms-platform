// Source - https://stackoverflow.com/a/67232471
// Posted by Kitsune66
// Retrieved 2026-03-24, License - CC BY-SA 4.0

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

 export const equivalentValidator = (firstControlName: string, secondControlName: string): ValidatorFn => {
    
    return (control: AbstractControl): ValidationErrors | null => {
      const firstControl = control.get(firstControlName);
      const secondControl = control.get(secondControlName);
    
      if (secondControl !=null && firstControl!=null && secondControl.value && secondControl.value !== firstControl.value ) {
        secondControl.setErrors({ notEqual: true });
      }
    
      return null;
    };
  }

