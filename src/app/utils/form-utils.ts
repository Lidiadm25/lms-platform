import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";
async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}

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

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordsNotEqual: true };
    };
  }

  static async checkingServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {

    await sleep(); // 2 segundos y medio

    const formValue = control.value;
    console.log(formValue)
    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true,
      };
    }
    return null;
  }

 
}