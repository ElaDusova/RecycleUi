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
}
