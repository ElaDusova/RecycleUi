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

  // Method to handle form submission
  onSubmit(): void {
    this.submitted = true; // Mark form as submitted

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
        this.errorMessage = error?.message || 'Invalid email or password. Please try again.';
        console.error(error);
      },
    });
  }
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


  protected hasError(controlName: string, errorType: string): boolean {
    const control = this.formular.get(controlName);
    return !!control && control.hasError(errorType) && (control.dirty || control.touched || this.submitted);
  }
  }
