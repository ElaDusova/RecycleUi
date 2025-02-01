import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountDetail } from '../models/user/account-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class  UserService {
  private baseUrl = 'api/v1/User/';

  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<AccountDetail> {
    return this.http.get<AccountDetail>(`${this.baseUrl}${id}`);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }
}
