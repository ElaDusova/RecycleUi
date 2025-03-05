// src/app/pages/validation-products-page/validation-products-page.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductDetail } from '../../../models/product/product-detail.interface';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Operation } from 'fast-json-patch';

@Component({
  selector: 'app-validation-products-articles-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './validation-products-page.component.html',
  styleUrls: ['./validation-products-page.component.scss']
})
export class ValidationProductsPageComponent implements OnInit {
  private productService = inject(ProductService);

  products$: BehaviorSubject<ProductDetail[]> = new BehaviorSubject<ProductDetail[]>([]);
  products: ProductDetail[] = [];
  selectedProduct: ProductDetail | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.fetchUnverifiedProducts();
  }

  fetchUnverifiedProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        // Filter out verified products
        this.products = products.filter(product => product.isVerified === false);
        this.products$.next(this.products);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.errorMessage = 'Failed to load products';
      }
    });
  }

  openEditModal(product: ProductDetail): void {
    this.selectedProduct = { ...product }; // Clone the object to avoid direct modification
  }

  closeModal(): void {
    this.selectedProduct = null;
  }

  saveChanges(): void {
    if (!this.selectedProduct) return;

    // Create the JSON Patch document
    const patch: Operation[] = [];

    if (this.selectedProduct.name) {
      patch.push({ op: 'replace', path: '/name', value: this.selectedProduct.name });
    }
    if (this.selectedProduct.description) {
      patch.push({ op: 'replace', path: '/description', value: this.selectedProduct.description });
    }
    if (this.selectedProduct.ean) {
      patch.push({ op: 'replace', path: '/ean', value: this.selectedProduct.ean });
    }

    // Always include isVerified in the PATCH request
    console.log('isVerified:', this.selectedProduct.isVerified);

    // Setting isVerified to true when saving changes
    patch.push({ op: 'replace', path: '/isVerified', value: this.selectedProduct.isVerified ?? false });

    // Call the ProductService to send the PATCH request
    this.productService.updateProduct(this.selectedProduct.id, patch).subscribe({
      next: () => {
        // Remove the verified product from the local list
        this.products = this.products.filter(product => product.id !== this.selectedProduct?.id);

        // Update the observable to trigger change detection
        this.products$.next(this.products);

        // Close the modal
        this.closeModal();
        console.log('PATCH Payload:', JSON.stringify(patch));
      },
      error: (err) => {
        console.error('Error updating product:', err);
        this.errorMessage = 'Failed to update product.';
      }
    });
  }

  verifyProduct(product: ProductDetail): void {
    this.openEditModal(product);
    this.selectedProduct!.isVerified = true; // Set isVerified to true
    this.saveChanges();
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.fetchUnverifiedProducts(); // Refresh list after deletion
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          this.errorMessage = 'Failed to delete product.';
        }
      });
    }
  }

  // Add this method to fix trackBy error in *ngFor
  trackByProductId(index: number, product: ProductDetail): string {
    return product.id;
  }
}
