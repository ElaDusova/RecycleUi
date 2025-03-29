import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../models/user/login.interface';
/**
 * Login page component handling user authentication.
 * Uses reactive forms for validation and communicates with the AuthService.
 */
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);

  // Form group with validations
  protected formular: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  protected errorMessage: string | null = null; // Holds error messages
  protected isLoading = false; // Loading state
  protected submitted = false; // Tracks if the form was submitted

    /**
   * Handles form submission and user authentication.
   * Displays validation errors and handles API responses.
   */
  // Method to handle subbmiting the form
  onSubmit(): void {
    this.submitted = true;

    if (this.formular.invalid) {
      this.errorMessage = 'Please fill in the form correctly.';
      return;
    }

    this.isLoading = true;
    const data = this.formular.getRawValue();

    this.authService.login(data).subscribe({
      next: async () => {
        this.isLoading = false;
        this.errorMessage = null; // Clear previous error messages
        this.formular.reset(); // Reset the form
        this.submitted = false; // Reset submitted state
        await this.router.navigate(['/']); // Navigate on success
      },
      error: (error) => {
        this.isLoading = false;

        // Custom error message based on status code
        if (error.status === 400) {
          this.errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.status === 401) {
          this.errorMessage = 'Unauthorized. Please check your credentials.';
        } else if (error.status === 500) {
          this.errorMessage = 'Server error. Please try again later.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }

        console.error('Login failed:', error);
      },
    });
  }
    /**
   * Logs in the user and stores the user ID in local storage.
   * @param credentials - User login data.
   */
  loginUser(credentials: LoginModel): void {
    this.authService.login(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('userId', response.userId); // Store user ID
        this.router.navigate(['/dashboard']); // Redirect after login
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }

  /**
   * Checks if a form control has a specific validation error.
   * @param controlName - Name of the form control.
   * @param errorType - Type of error to check for.
   * @returns True if the control has the specified error.
   */
  protected hasError(controlName: string, errorType: string): boolean {
    const control = this.formular.get(controlName);
    return !!control && control.hasError(errorType) && (control.dirty || control.touched || this.submitted);
  }
  }
