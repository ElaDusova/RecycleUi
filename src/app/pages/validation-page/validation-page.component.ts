import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-email-validation',
  templateUrl: './validation-page.component.html',
  styleUrls: ['./validation-page.component.scss'],
})
export class ValidationPageComponent implements OnInit {
  isLoading = true;
  isSuccess: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    const email = this.route.snapshot.queryParamMap.get('email');

    if (token && email) {
      this.authService.validateToken(token, email).subscribe({
        next: () => {
          this.isSuccess = true;
          setTimeout(() => this.router.navigate(['/login']), 3000); // Redirect after success
        },
        error: () => {
          this.isSuccess = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.isSuccess = false;
      this.isLoading = false;
    }
  }
}
