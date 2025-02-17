import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggedUser } from '../models/user/account-detail.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `/api/v1/Auth`;
  private readonly httpClient = inject(HttpClient);

  getUserInfo(): Observable<LoggedUser> {
    return this.httpClient.get<LoggedUser>(`${this.baseUrl}/UserInfo`);
  }
}
