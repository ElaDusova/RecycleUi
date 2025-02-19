import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AccountDetail } from '../../../models/user/account-detail.interface';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.scss'],
})
export class UserAccountPageComponent implements OnInit {
  private userService = inject(UserService);
  user: AccountDetail = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    profilePictureUrl: '',
    isAdmin: false
  };

  errorMessage: string | null = null;
  successMessage: string | null = null;

  // Separate password fields
  oldPassword: string = '';
  newPassword: string = '';

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.userService.getAccountInfo().subscribe({
      next: (user) => {
        this.user = user;
        console.log('User info:', user);
      },
      error: (err) => {
        console.error('Error fetching user:', err);
        this.errorMessage = 'Failed to load user details.';
      }
    });
  }

  private showSuccessMessage(message: string) {
    this.successMessage = message;
    setTimeout(() => this.successMessage = null, 3000); // Clear message after 3s
  }

  private showErrorMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = null, 5000); // Clear message after 5s
  }

  updateUsername() {
    this.userService.updateUsername(this.user.userName).subscribe({
      next: () => this.showSuccessMessage("✅ Username updated successfully!"),
      error: (err) => this.showErrorMessage("❌ Failed to update username."),
    });
  }

  updateEmail() {
    this.userService.updateEmail(this.user.email).subscribe({
      next: () => this.showSuccessMessage("✅ Email updated successfully!"),
      error: (err) => this.showErrorMessage("❌ Failed to update email."),
    });
  }

  updatePassword() {
    if (!this.oldPassword || !this.newPassword) {
      this.showErrorMessage("❌ Both passwords are required.");
      return;
    }

    this.userService.updatePassword(this.oldPassword, this.newPassword).subscribe({
      next: () => {
        this.showSuccessMessage("✅ Password updated successfully!");
        this.oldPassword = ''; // Clear fields
        this.newPassword = '';
      },
      error: (err) => this.showErrorMessage("❌ Failed to update password."),
    });
  }
}
