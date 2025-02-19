import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reset-passowrd-page.component.html',
  styleUrls: ['./reset-passowrd-page.component.scss'],
})
export class ResetPasswordPageComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  protected form: FormGroup = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  protected successMessage: string | null = null;
  protected errorMessage: string | null = null;
  private token: string = '';
  private email: string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      this.email = params['email'] || '';

      if (!this.token || !this.email) {
        this.errorMessage = 'Invalid or expired reset link.';
      }
    });
  }

  resetPassword(): void {
    if (this.form.invalid) return;
    if (this.form.value.newPassword !== this.form.value.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authService.resetPassword(this.email, this.token, this.form.value.newPassword).subscribe({
      next: () => {
        this.successMessage = 'Password reset successful! You can now log in.';
        this.errorMessage = null;
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (err) => {
        console.error('Error resetting password:', err);
        this.errorMessage = 'Failed to reset password. Please try again.';
      },
    });
  }
}
