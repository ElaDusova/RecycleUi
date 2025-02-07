import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccountDetail } from '../../../models/user/account-detail.interface';
import { UserChangesService } from '../../../services/userChanges.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.scss'],
})
export class UserAccountPageComponent implements OnInit {
  private userService = inject(UserService);
  private userChangesService = inject(UserChangesService);

  user: any = null;
  userInfoFields = [
    { label: 'First Name', key: 'firstname' },
    { label: 'Last Name', key: 'lastname' },
    { label: 'Username', key: 'displayname' },
    { label: 'Email', key: 'email' },
    { label: 'Date of Birth', key: 'dateofbirth' },
  ];

  activeModal: string | null = null;
  modalTitle: string = '';
  modalLabel: string = '';
  modalValue: string = '';

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser(): void {
    this.userService.getUserById('current').subscribe({
      next: (user) => (this.user = user),
      error: (err) => console.error('Error fetching user:', err),
    });
  }

  openModal(type: string): void {
    this.activeModal = type;

    switch (type) {
      case 'profilePicture':
        this.modalTitle = 'Change Profile Picture';
        this.modalLabel = 'New Profile Picture URL';
        this.modalValue = this.user?.profilePicture || '';
        break;
      case 'displayname':
        this.modalTitle = 'Change Username';
        this.modalLabel = 'New Username';
        this.modalValue = this.user?.displayname || '';
        break;
      case 'password':
        this.modalTitle = 'Change Password';
        this.modalLabel = 'New Password';
        this.modalValue = '';
        break;
    }
  }

  closeModal(): void {
    this.activeModal = null;
  }

  saveChanges(): void {
    if (!this.activeModal) return;

    switch (this.activeModal) {
      case 'profilePicture':
        this.userChangesService.updateProfilePicture(this.user.id, { profilePicture: this.modalValue }).subscribe({
          next: () => {
            this.user.profilePicture = this.modalValue;
            this.closeModal();
          },
          error: (err) => console.error('Error updating profile picture:', err),
        });
        break;
      case 'displayname':
        this.userChangesService.updateUserName(this.user.id, { displayname: this.modalValue }).subscribe({
          next: () => {
            this.user.displayname = this.modalValue;
            this.closeModal();
          },
          error: (err) => console.error('Error updating username:', err),
        });
        break;
      case 'password':
        this.userChangesService.updateUserPassword(this.user.id, { password: this.modalValue }).subscribe({
          next: () => {
            this.closeModal();
          },
          error: (err) => console.error('Error updating password:', err),
        });
        break;
    }
  }
}
