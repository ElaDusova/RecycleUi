import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-logout-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss'],
})
export class LogoutPageComponent {
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);

  protected isLoading = false;
  protected errorMessage: string | null = null;

  onLogout(): void {
    this.isLoading = true;
    this.authService.logout(); // Call the logout function in the AuthService
  }
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back(); // Navigate to the previous page in history
  }
}
