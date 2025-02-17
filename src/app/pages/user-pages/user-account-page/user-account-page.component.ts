import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserChangesService } from '../../../services/userChanges.service';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { LoggedUser } from '../../../models/user/account-detail.interface';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.scss'],
})
export class UserAccountPageComponent implements OnInit {
  private userService = inject(UserService);
  user: LoggedUser | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.userService.getUserInfo().subscribe({
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
}
