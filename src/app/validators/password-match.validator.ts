import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('passwordConfirm')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsMismatch: true }; // Error key
    }

    return null; // No errors
  };
}
