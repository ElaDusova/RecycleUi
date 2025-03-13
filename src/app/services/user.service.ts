import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountDetail } from '../models/user/account-detail.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `/api/v1/User`;
  private readonly httpClient = inject(HttpClient);

  /** ✅ Get user account details */
  getAccountInfo(): Observable<AccountDetail> {
    return this.httpClient.get<AccountDetail>(`${this.baseUrl}/UserInfo`);
  }

  /** ✅ Update username */
  updateUsername(newUsername: string): Observable<void> {
    return this.httpClient.patch<void>(
      `${this.baseUrl}/UpdateUsername`,
      JSON.stringify(newUsername),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  /** ✅ Update email */
  updateEmail(newEmail: string): Observable<void> {
    return this.httpClient.patch<void>(
      `${this.baseUrl}/UpdateEmail`,
      JSON.stringify(newEmail),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  /** ✅ Update password */
  updatePassword(oldPassword: string, newPassword: string): Observable<void> {
    return this.httpClient.patch<void>(
      `${this.baseUrl}/UpdatePassword`,
      { oldPassword, newPassword },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
/** ✅ Update profile picture */
updateProfilePicture(imageFile: File): Observable<any> {
  const formData = new FormData();
  formData.append('profilePicture', imageFile);

  return this.httpClient.patch<{ imagePath: string }>(
    `${this.baseUrl}/UpdateProfilePicture`,formData);
}
}
