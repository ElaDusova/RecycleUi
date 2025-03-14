import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container-add-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './utilities-add-page.component.html',
  styleUrl: './utilities-add-page.component.scss'
})
export class UtilitiesAddPageComponent {
  private router = inject(Router);

  navigateTo(page: string): void {
    if (page === 'container') {
      this.router.navigate(['/create-container']);
    } else if (page === 'material') {
      this.router.navigate(['/create-material']);
    } else if (page === 'part') {
      this.router.navigate(['/create-part']);
    }
  }

}
