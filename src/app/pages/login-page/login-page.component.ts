import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  protected readonly fb = inject(FormBuilder);

  protected readonly authService = inject(AuthService);

  protected readonly router = inject(Router);

  protected formular = this.fb.group({
    email: new FormControl('', { nonNullable: true}),
    password: new FormControl('', { nonNullable: true})
  });

  onSubmit(): void {
    const data = this.formular.getRawValue();

    this.authService.login(data).subscribe({
      next: async () => {
          await this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
