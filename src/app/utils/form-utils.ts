import { ValidationErrors } from "@angular/forms";

export class FormUtils{

    static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';



    static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Minimum of ${errors['minlength'].requiredLength} characters`;

        case 'min':
          return `Minimum value ${errors['min'].min}`;

        case 'email':
          return `The value does not align with email address format`;

        case 'emailTaken':
          return `The email is already being used`;

        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'The email inserted does not look like an email address';
          }

          return 'Error of regex';

        default:
          return `Validation error ${key}`;
      }
    }

    return null;
  }
}