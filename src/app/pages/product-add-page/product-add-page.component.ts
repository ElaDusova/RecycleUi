import { Component, signal, inject, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { ProductCreate } from '../../models/product/product-create.interface';
import { ProductCreateComponent } from '../../components/product/product-create/product-create.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

/**
 * Page component for adding a new product.
 * Uses `ProductCreateComponent` for form handling and communicates with `ProductService`.
 */
@Component({
  selector: 'app-product-add-page',
  templateUrl: './product-add-page.component.html',
  styleUrls: ['./product-add-page.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ProductCreateComponent, FormsModule, CommonModule]
})
export class ProductAddPageComponent {
  private productService = inject(ProductService);
  private router = inject(Router);

  readonly product = signal<ProductCreate>({
    name: '',
    ean: '',
    description: '',
    isVerified: false,
    picturePath: '',
    partIds: []
  });

 /**
   * Handles product creation and sends data to the backend.
   * Redirects to the product search page on success.
   * @param newProduct - The created product data.
   */
  onProductCreated(newProduct: ProductCreate): void {
    console.log('Sending product to backend:', newProduct);

    this.productService.createProduct(newProduct).subscribe({
      next: (savedProduct) => {
        console.log('Product saved successfully:', savedProduct);
        this.router.navigate(['/product-search']); // Redirect after saving
      },
      error: (error) => {
        console.error('Failed to save product:', error);
      }
    });
  }
}
