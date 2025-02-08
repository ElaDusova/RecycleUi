import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountDetail } from '../models/user/account-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class  UserService {
  private readonly baseUrl = '/api/v1/User';
  private http = inject(HttpClient);

  getUserById(userId: string): Observable<AccountDetail> {
    return this.http.get<AccountDetail>(`${this.baseUrl}/${userId}`);
  }

}
