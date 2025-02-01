import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordUpdate } from '../models/user/password-update.interface';
import { EmailUpdate } from '../models/user/email-update.interface';
import { UsernameUpdate } from '../models/user/username-update.interface';
import { ProfilePictureUpdate } from '../models/user/profilePicture-update.interface';

@Injectable({
  providedIn: 'root'
})
export class UserChangesService {
  protected readonly baseUrl = '/api/v1/User/UserChanges';
  private readonly httpClient = inject(HttpClient);

  // Fetch all products
  updateUserPassword(id: string, patch: any): Observable<PasswordUpdate> {
      return this.httpClient.patch<PasswordUpdate>(`${this.baseUrl}${id}`, patch);
  }
  updateUserEmail(id: string, patch: any): Observable<EmailUpdate> {
      return this.httpClient.patch<EmailUpdate>(`${this.baseUrl}${id}`, patch);
  }
  updateUserName(id: string, patch: any): Observable<UsernameUpdate> {
      return this.httpClient.patch<UsernameUpdate>(`${this.baseUrl}${id}`, patch);
  }
  updateProfilePicture(id: string, patch: any): Observable<ProfilePictureUpdate> {
      return this.httpClient.patch<ProfilePictureUpdate>(`${this.baseUrl}${id}`, patch);
  }
}
