import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login.interface';
import { tap } from 'rxjs/operators';
import { RegisterModel } from '../models/register.interface';
import { AUTH_TOKEN } from '../components/contexts/token.context';

@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    private baseUrl = '/api/v1/Auth';
    private readonly router = inject(Router);
    private readonly httpClient = inject(HttpClient);
    private readonly token = inject(AUTH_TOKEN);
    private isLoggedInSubject = new ReplaySubject<boolean>(1);
    isLoggedIn$ = this.isLoggedInSubject.asObservable();
    constructor(private http: HttpClient) {}

    register(data: RegisterModel): Observable<any> {
      return this.httpClient
      .post<any>(`${this.baseUrl}/Register`, data);
    }

    login(data: LoginModel): Observable<any> {
      return this.httpClient
        .post<any>(`${this.baseUrl}/Login`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .pipe(tap((response) => {
          const token = response.token;
          console.log(token);
          this.token.set(token);

          this.router.navigate(['/home']);
          this.isLoggedInSubject.next(true)
        }
        ));
      }

    logout(): void {
      this.httpClient
        .post(`${this.baseUrl}/Logout`, {}, { withCredentials: true })
        .subscribe(() => {
          this.isLoggedInSubject.next(false);
          this.router.navigate(['/login']);
        });
    }

    isAuthenticated(): boolean {
      let isAuthenticated = false;
      this.isLoggedInSubject.subscribe(status => isAuthenticated = status).unsubscribe();
      return isAuthenticated;
    }
    sendResetPasswordEmail(email: string): Observable<void> {
      return this.http.post<void>(`${this.baseUrl}/ForgotPassword`, { email });
  }
}
