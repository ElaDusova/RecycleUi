import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductDetail } from '../../../models/product/product-detail.interface';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-delete',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.scss'
})
export class ProductDeleteComponent implements OnInit {
  protected readonly productService = inject(ProductService);
  protected products: ProductDetail[] = [];
  protected errorMessage: string | null = null;

  ngOnInit(): void {
    this.loadProducts();
  }

  protected loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.errorMessage = 'Failed to load products.';
      }
    });
  }

  protected deleteProduct(productId: string): void {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== productId);
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        this.errorMessage = 'Failed to delete product.';
      }
    });
  }
}
