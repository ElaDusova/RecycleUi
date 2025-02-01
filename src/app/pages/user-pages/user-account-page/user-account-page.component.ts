import { Component, OnInit } from '@angular/core';
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
  user: AccountDetail | null = null; // Holds user data
  isLoading = true;

  constructor(
    private userChangesService: UserChangesService,
    private userAccountService: UserService
  ) {}


  ngOnInit(): void {
    const userId = 'someUserId'; // Replace with actual user ID logic

    // Fetch user details using `UserService`
    this.userAccountService.getUserById(userId).subscribe({
      next: (data) => {
        this.user = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.isLoading = false;
      },
    });
  }

  // Placeholder methods for actions
  updateProfilePicture(): void {
    console.log('Update profile picture logic here...');
  }

  updateUsername(): void {
    console.log('Update username logic here...');
  }

  updatePassword(): void {
    console.log('Update password logic here...');
  }
}
