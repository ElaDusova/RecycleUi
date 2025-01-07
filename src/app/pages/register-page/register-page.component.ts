import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, switchMap } from 'rxjs';

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

  protected formular = this.fb.group({
    email: new FormControl('', { nonNullable: true}),
    password: new FormControl('', { nonNullable: true}),
    name: new FormControl('', { nonNullable: true}),
    passwordConfirm: new FormControl('', { nonNullable: true}),
    surname: new FormControl('', { nonNullable: true}),
    birthdate: new FormControl('', { nonNullable: true}),
    phone: new FormControl('', { nonNullable: true}),
  });

  onSubmit(): void {
    const data = this.formular.getRawValue();

    this.authService.register(data).pipe(
      catchError((error) => {
        // Handle error here
        console.error('Registration error', error);
        return [];
      })
    ).subscribe({
      next: () => {
        // Handle successful registration
        console.log('Registration successful');
        this.router.navigate(['/login']); // Redirect to login page
      },
      error: (error) => {
        // Handle registration error
        console.error('Registration failed', error);
      }    });
  }

}
