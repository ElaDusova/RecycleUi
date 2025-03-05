import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReplaySubject, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginModel } from '../models/user/login.interface';
import { RegisterModel } from '../models/user/register.interface';
import { map, tap } from 'rxjs/operators';
import { AccountDetail } from '../models/user/account-detail.interface';


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

    register(data: RegisterModel): Observable<any> {
      return this.httpClient
      .post<any>(`${this.baseUrl}/Register`, data);
    }
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
      isAuthenticated(): boolean {
    let isAuthenticated = false;
    this.isLoggedInSubject
      .subscribe((status) => (isAuthenticated = status))
      .unsubscribe();
    return isAuthenticated;
  }
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
  validateToken(token: string, email: string): Observable<any> {
    return this.httpClient.post('/api/v1/Auth/ValidateToken', { token, email });
  }
    // Request password reset (sends email)
    requestPasswordReset(email: string): Observable<void> {
      return this.httpClient.post<void>(`${this.baseUrl}/ForgotPassword`, { email });
    }

    // Reset password using token
    resetPassword(email: string, token: string, newPassword: string): Observable<void> {
      return this.httpClient.post<void>(`${this.baseUrl}/ResetPassword`, { email, token, newPassword });
    }
}
