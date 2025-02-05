import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, AsyncPipe,],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultComponent {
  protected readonly router = inject(Router);

  protected readonly authService = inject(AuthService);
  protected user$ = this.authService.isLoggedIn$;
  isAdmin$ = this.authService.isAdmin$;

logout() {
    this.authService.logout();
  }
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  isLoggedIn(): boolean {
    let loggedIn = false;
    this.authService.user$.subscribe(user => loggedIn = !!user).unsubscribe();
    return loggedIn;
  }

  isAdmin(): boolean {
    let isAdmin = false;
    this.authService.user$.subscribe(user => isAdmin = user?.isAdmin ?? false).unsubscribe();
    return isAdmin;
  }
}
