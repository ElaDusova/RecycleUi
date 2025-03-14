import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AccountDetail } from '../../../models/user/account-detail.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.scss'],
})
export class UserAccountPageComponent implements OnInit {
  private userService = inject(UserService);
  private http = inject(HttpClient);

  user: AccountDetail = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    profilePictureUrl: '',
    isAdmin: false
  };
  isModalOpen = false;
  imagePreview: string | null = null;
  selectedFile: File | null = null;
  profilePictureUrl: string | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isUploading: boolean = false;

  // Separate password fields
  oldPassword: string = '';
  newPassword: string = '';


  ngOnInit(): void {
    this.loadUserInfo();
    this.fetchProfilePicture();
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
  fetchProfilePicture(): void {
    this.http.get<{ profilePicture: string }>('/api/v1/User/ProfilePicture')
      .subscribe({
        next: (response) => this.profilePictureUrl = response.profilePicture,
        error: (err) => console.error('Error fetching profile picture:', err)
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
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.imagePreview = null;
    this.selectedFile = null;
  }

  triggerFileInput(): void {
    const fileInput = document.querySelector<HTMLInputElement>('#fileInput');
    if (fileInput) fileInput.click();
  }
  removeImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;
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
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];

      // Generate a preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  uploadProfilePicture(): void {
    if (!this.selectedFile) {
      console.error('No file selected for upload.');
      return;
    }

    this.isUploading = true;
    const formData = new FormData();
    formData.append('profilePicture', this.selectedFile); // Ensure the backend expects 'profilePicture'

    this.userService.updateProfilePicture(this.selectedFile).subscribe({
      next: (uploadResponse) => {
        console.log('Profile picture uploaded successfully:', uploadResponse.imagePath);

        // Update the profile picture preview
        this.profilePictureUrl = `https://your-backend-url/uploads/${uploadResponse.imagePath}`;

        this.isUploading = false;
      },
      error: (error) => {
        console.error('Error uploading profile picture:', error);
        this.isUploading = false;
      }
    });
  }
  }
