import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guards routes by checking if the user is authenticated.
 * Redirects to the login page if authentication fails.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

    /**
   * Determines if a route can be activated based on authentication status.
   * @returns `true` if the user is authenticated, otherwise redirects to login and returns `false`.
   */
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
