import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccountDetail } from '../../../models/user/account-detail.interface';
import { UserChangesService } from '../../../services/userChanges.service';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.scss'],
})
export class UserAccountPageComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  user: AccountDetail | null = null;

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        localStorage.setItem('userId', user.id); // Store userId for future requests
      },
      error: (err) => console.error('Error fetching current user:', err),
    });
  }

  loadUser(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (user) => (this.user = user),
      error: (err) => console.error('Error fetching user:', err),
    });
  }

  getLoggedInUserId(): string | null {
    return localStorage.getItem('userId') || null;
  }

  navigateToChangePassword(): void {
    this.router.navigate(['/user/change-password']);
  }

  navigateToChangeUsername(): void {
    this.router.navigate(['/user/change-username']);
  }
}
