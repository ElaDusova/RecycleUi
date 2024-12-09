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
    name: new FormControl('', { nonNullable: true})
  });

  onSubmit(): void {
    const data = this.formular.getRawValue();
/*
    this.authService.register(data).pipe(switchMap((result) => {
      return this.authService.validateToken(result, data.email);
    })).subscribe({
      next: (response) => {

      }, error: () => {

      }
    });*/
  }

}
