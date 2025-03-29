import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReplaySubject, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginModel } from '../models/user/login.interface';
import { RegisterModel } from '../models/user/register.interface';
import { map, tap } from 'rxjs/operators';
import { AccountDetail } from '../models/user/account-detail.interface';

/**
 * Service for authentication and user account management.
 * Handles login, registration, logout, token refresh, and password reset.
 */
@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    private baseUrl = '/api/v1/Auth';
    private readonly router = inject(Router);
    private readonly httpClient = inject(HttpClient);
    private isLoggedInSubject = new ReplaySubject<boolean>(1);


    private userSubject = new BehaviorSubject<AccountDetail | null>(null);
    user$ = this.userSubject.asObservable();
    isLoggedIn$ = this.isLoggedInSubject.asObservable();
    isAdmin$ = this.user$.pipe(map(user => user?.isAdmin ?? false));

    constructor() {
      const token = localStorage.getItem('accessToken');
      if (token) {
        this.isLoggedInSubject.next(true);  // User is authenticated

        // Load user details if token is present
        this.getUserDetails().subscribe({
          next: (user) => {
            this.userSubject.next(user);
          },
          error: (error) => {
            console.error('Error loading user details:', error);
            // If there's an error (e.g., token expired), log the user out
            this.logout();
          }
        });
      } else {
        this.isLoggedInSubject.next(false);  // User is not authenticated
      }
    }

      /**
   * Registers a new user.
   * @param data - User registration details.
   * @returns Observable of the registration response.
   */
    register(data: RegisterModel): Observable<any> {
      return this.httpClient
      .post<any>(`${this.baseUrl}/Register`, data);
    }
      /**
   * Refreshes the authentication token.
   * @returns Observable with the new access token.
   */
    refreshToken(): Observable<string> {
      return this.httpClient
        .post<{ token: string }>(`${this.baseUrl}/Refresh`, {}).pipe(
          map((response) => {
            const newAccessToken = response.token;
            localStorage.setItem('accessToken', newAccessToken);
            return newAccessToken;
          })
        );
    }
  /**
   * Logs in a user and stores the access token.
   * @param data - User login credentials.
   * @returns Observable of the login response.
   */
    login(data: LoginModel): Observable<any> {
      return this.httpClient.post<any>(`${this.baseUrl}/Login`, data).pipe(
        tap((response) => {
          const token = response.token;
          localStorage.setItem('accessToken', token);

          this.isLoggedInSubject.next(true);

          // Load user details after successful login
          this.getUserDetails().subscribe();

          this.router.navigate(['/home']);
        })
      );
    }
      /**
   * Logs out the user, clears authentication state, and navigates to login.
   */
    logout(): void {
      this.httpClient.post(`${this.baseUrl}/Logout`, {}).subscribe({
        next: () => {
          localStorage.removeItem('accessToken');
          this.isLoggedInSubject.next(false);  // <-- This ensures isLoggedIn is set to false
          this.userSubject.next(null);  // <-- This clears the user data
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error during logout:', error);
        }
      });
    }
      /**
   * Checks if the user is authenticated.
   * @returns True if authenticated, otherwise false.
   */
      isAuthenticated(): boolean {
    let isAuthenticated = false;
    this.isLoggedInSubject
      .subscribe((status) => (isAuthenticated = status))
      .unsubscribe();
    return isAuthenticated;
  }
    /**
   * Retrieves user details and updates the observable state.
   * @returns Observable of the user details.
   */
  getUserDetails(): Observable<AccountDetail> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<AccountDetail>('/api/v1/User/UserInfo', { headers }).pipe(
      tap((user) => {
       this.userSubject.next(user);
      })
    );
  }
      sendResetPasswordEmail(email: string): Observable<void> {
      return this.httpClient.post<void>(`${this.baseUrl}/ForgotPassword`, { email });
  }
    /**
   * Validates a password reset token.
   * @param token - The reset token.
   * @param email - The email associated with the reset token.
   * @returns Observable with the validation response.
   */
  validateToken(token: string, email: string): Observable<any> {
    return this.httpClient.post('/api/v1/Auth/ValidateToken', { token, email });
  }
  /**
   * Sends a password reset request to the backend.
   * @param email - The user's email address.
   * @returns Observable that completes when the request is sent.
   */    requestPasswordReset(email: string): Observable<void> {
      return this.httpClient.post<void>(`${this.baseUrl}/ForgotPassword`, { email });
    }

  /**
   * Resets the user's password using a token.
   * @param email - The user's email address.
   * @param token - The password reset token.
   * @param newPassword - The new password to be set.
   * @returns Observable that completes when the password is reset.
   */    resetPassword(email: string, token: string, newPassword: string): Observable<void> {
      return this.httpClient.post<void>(`${this.baseUrl}/ResetPassword`, { email, token, newPassword });
    }
}
