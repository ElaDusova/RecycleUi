import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductDetail } from '../../../models/product/product-detail.interface';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { JsonPatchDocument } from '../../../models/JSON/JsonPatchDocument';

@Component({
  selector: 'app-validation-products-articles-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './validation-products-page.component.html',
  styleUrl: './validation-products-page.component.scss'
})
export class ValidationProductsPageComponent implements OnInit {

  private productService = inject(ProductService);

  products$: Observable<ProductDetail[]> = of([]);
  selectedProduct: ProductDetail | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.fetchUnverifiedProducts();
  }

  fetchUnverifiedProducts(): void {
    this.products$ = this.productService.getProducts().pipe(
      catchError((err) => {
        console.error('Error fetching products:', err);
        this.errorMessage = 'Failed to load products';
        return of([]);
      })
    );
  }

  openEditModal(product: ProductDetail): void {
    this.selectedProduct = { ...product }; // Clone the object to avoid direct modification
  }

  closeModal(): void {
    this.selectedProduct = null;
  }

  saveChanges(): void {
    if (this.selectedProduct) {
      const patchDocument: JsonPatchDocument[] = [
        { op: 'replace', path: '/name', value: this.selectedProduct.name },
        { op: 'replace', path: '/ean', value: this.selectedProduct.ean },
        { op: 'replace', path: '/description', value: this.selectedProduct.description },
        { op: 'replace', path: '/picturePath', value: this.selectedProduct.picturePath },
        { op: 'replace', path: '/isVerified', value: this.selectedProduct.isVerified }
      ];

      this.productService.updateProduct(this.selectedProduct.id, patchDocument).subscribe({
        next: () => {
          this.fetchUnverifiedProducts(); // Refresh the list (removes verified items)
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating product:', err);
          this.errorMessage = 'Failed to update product.';
        },
      });
    }
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
        },
      });
    }
  }
}
