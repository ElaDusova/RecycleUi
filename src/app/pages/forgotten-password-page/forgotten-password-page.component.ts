import { Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-forgotten-password-page',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgotten-password-page.component.html',
  styleUrl: './forgotten-password-page.component.scss'
})
export class ForgottenPasswordPageComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);

  protected form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  protected errorMessage: string | null = null;
  protected successMessage: string | null = null;
  protected isLoading = false;

  onSubmit(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    const email = this.form.get('email')?.value;

    this.authService.sendResetPasswordEmail(email).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'A password reset email has been sent.';
        this.form.reset();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.message || 'An error occurred. Please try again.';
      }
    });
  }
}
