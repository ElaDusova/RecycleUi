import { AccountDetail } from './../models/user/account-detail.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReplaySubject, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginModel } from '../models/user/login.interface';
import { RegisterModel } from '../models/user/register.interface';
import { map, tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    private baseUrl = '/api/v1/Auth';
    private readonly router = inject(Router);
    private readonly httpClient = inject(HttpClient);
    private isLoggedInSubject = new ReplaySubject<boolean>(1);

    private readonly userUrl = '/api/v1/User';

    private userSubject = new BehaviorSubject<AccountDetail | null>(null);
    user$ = this.userSubject.asObservable();
    isLoggedIn$ = this.isLoggedInSubject.asObservable();
    isAdmin$ = this.user$.pipe(map(user => user?.isAdmin ?? false));

    constructor(){
      const token = localStorage.getItem('accessToken');
      if (token) {
        this.isLoggedInSubject.next(true);  // User is authenticated
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

        this.router.navigate(['/home']);
        this.isLoggedInSubject.next(true);
      })
    );
  }
  getCurrentUser(): Observable<AccountDetail> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get<AccountDetail>(`${this.userUrl}/current`, { headers });
  }
  logout(): void {
    this.httpClient
      .post(`${this.baseUrl}/Logout`, {})
      .subscribe(() => {
        localStorage.removeItem('accessToken');
        this.isLoggedInSubject.next(false);
        this.router.navigate(['/login']);
      });
  }
  isAuthenticated(): boolean {
    let isAuthenticated = false;
    this.isLoggedInSubject
      .subscribe((status) => (isAuthenticated = status))
      .unsubscribe();
    return isAuthenticated;
  }
    sendResetPasswordEmail(email: string): Observable<void> {
      return this.httpClient.post<void>(`${this.baseUrl}/ForgotPassword`, { email });
  }
}
