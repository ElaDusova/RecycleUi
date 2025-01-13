import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    // Check if passwords match
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsMismatch: true }; // Return error if they don't match
    }
    return null; // No error if they match
  };
}
