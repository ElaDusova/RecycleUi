import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountDetail } from '../models/user/account-detail.interface';

/**
 * Service for managing user-related operations.
 * Provides methods to retrieve, update, and manage user account details.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `/api/v1/User`;
  private readonly httpClient = inject(HttpClient);

  /**
   * Retrieves the logged-in user's account details.
   * @returns Observable containing account details.
   */
  getAccountInfo(): Observable<AccountDetail> {
    return this.httpClient.get<AccountDetail>(`${this.baseUrl}/UserInfo`);
  }

  /**
   * Updates the user's username.
   * @param newUsername - The new username.
   * @returns Observable that completes when the update is successful.
   */
  updateUsername(newUsername: string): Observable<void> {
    return this.httpClient.patch<void>(
      `${this.baseUrl}/UpdateUsername`,
      JSON.stringify(newUsername),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  /**
   * Updates the user's email address.
   * @param newEmail - The new email.
   * @returns Observable that completes when the update is successful.
   */
  updateEmail(newEmail: string): Observable<void> {
    return this.httpClient.patch<void>(
      `${this.baseUrl}/UpdateEmail`,
      JSON.stringify(newEmail),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  /**
   * Updates the user's password.
   * @param oldPassword - The current password.
   * @param newPassword - The new password.
   * @returns Observable that completes when the update is successful.
   */
  updatePassword(oldPassword: string, newPassword: string): Observable<void> {
    return this.httpClient.patch<void>(
      `${this.baseUrl}/UpdatePassword`,
      { oldPassword, newPassword },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  /**
   * Updates the user's profile picture.
   * @param imageFile - The image file to upload.
   * @returns Observable containing the uploaded image path.
   */
  // does not work yet, will be implemented in the future
  updateProfilePicture(imageFile: File): Observable<any> {
  const formData = new FormData();
  formData.append('profilePicture', imageFile);

  return this.httpClient.patch<{ imagePath: string }>(
    `${this.baseUrl}/UpdateProfilePicture`,formData);
}
}
