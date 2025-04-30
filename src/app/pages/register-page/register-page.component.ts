import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs';
import { passwordMatchValidator } from '../../validators/password-match.validator';

/**
 * Component for user registration.
 * Handles form validation, submission, and error handling.
 */
@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})

export class RegisterPageComponent {

  protected readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);

    /**
   * Registration form with validation.
   */
  protected formular = this.fb.group({
    firstname: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastname: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    dateofbirth: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    passwordConfirm: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  }, { validators: passwordMatchValidator });

  protected isSubmitting = false;
  protected successMessage: string | null = null;
  protected errorMessage: string | null = null;
  protected submitted = true; // Tracks if the form was submitted


    /**
   * Handles form submission for user registration.
   */
  onSubmit(): void {
    if (this.formular.invalid) {
      return;
    }

    this.isSubmitting = true;
    const data = this.formular.getRawValue();

    this.authService.register(data).pipe(
      catchError((error) => {
        console.error('Registration error', error);
        this.errorMessage = 'Registration failed. Please try again.';
        this.isSubmitting = false;
        return [];
      })
    ).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Please check your email to confirm your account.';
        this.isSubmitting = false;
        this.formular.reset();
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.errorMessage = 'Registration failed. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
  protected hasError(controlName: string, errorType: string): boolean {
    const control = this.formular.get(controlName);
    return !!control && control.hasError(errorType) && (control.dirty || control.touched || this.submitted);
  }
}
