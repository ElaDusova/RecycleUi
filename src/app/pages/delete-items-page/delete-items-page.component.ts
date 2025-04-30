import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-items-page',
  imports: [],
  templateUrl: './delete-items-page.component.html',
  styleUrl: './delete-items-page.component.scss'
})
export class DeleteItemsPageComponent {
  private router = inject(Router);

    /**
   * Navigates to the corresponding creation page based on the provided page type.
   * @param page - The type of entity to create (container, material, part, product).
   */
  navigateTo(page: string): void {
    if (page === 'container') {
      this.router.navigate(['/delete-container']);
    } else if (page === 'material') {
      this.router.navigate(['/delete-material']);
    } else if (page === 'part') {
      this.router.navigate(['/delete-part']);
    } else if (page === 'product') {
      this.router.navigate(['/delete-product']);
    }
  }
}
