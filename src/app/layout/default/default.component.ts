import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, HostListener  } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AccountDetail } from '../../models/user/account-detail.interface';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink,],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultComponent implements OnInit {
  protected readonly router = inject(Router);
  protected readonly authService = inject(AuthService);
  private cdRef = inject(ChangeDetectorRef);
  constructor() {
    this.router.events.subscribe(() => {
      this.isMenuOpen = false;  // Close the menu on navigation
    });
  }


  // Store user and role status in properties
  user: AccountDetail | null = null;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  ngOnInit(): void {
    // Subscribe to user and role observables
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.isAdmin = user?.isAdmin ?? false;
      this.isLoggedIn = !!user;
    });
  }

  logout() {
    this.authService.logout();
    this.cdRef.detectChanges();  // <-- Force change detection to update the UI immediately
  }
    isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;
    const clickedInside = targetElement.closest('#user-menu-button') || targetElement.closest('.dropdown-menu');

    if (!clickedInside) {
      this.isMenuOpen = false;  // Close the menu if clicked outside
    }
  }
}
