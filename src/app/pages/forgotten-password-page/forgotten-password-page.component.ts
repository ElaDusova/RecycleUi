import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forgotten-password-page.component.html',
  styleUrls: ['./forgotten-password-page.component.scss'],
})
export class ForgotPasswordPageComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  protected form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  protected successMessage: string | null = null;
  protected errorMessage: string | null = null;

  sendResetLink(): void {
    if (this.form.invalid) return;

    const email = this.form.value.email;
    this.authService.requestPasswordReset(email).subscribe({
      next: () => {
        this.successMessage = 'Password reset link sent! Check your email.';
        this.errorMessage = null;
      },
      error: (err) => {
        console.error('Error sending reset link:', err);
        this.errorMessage = 'Failed to send reset link. Please try again.';
      },
    });
  }
}
