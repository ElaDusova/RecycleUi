import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductDetail } from '../../models/product/product-detail.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

/**
 * Component for searching and displaying products.
 * Allows filtering by product name or EAN.
 */
@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchPageComponent implements OnInit {
  products: ProductDetail[] = []; // Full product list
  filteredProducts: ProductDetail[] = []; // Filtered products to display
  searchQuery: string = ''; // User's search input (EAN or name)

  constructor(private productService: ProductService, private router: Router) {}

   /**
   * Loads all products when the component is initialized.
   */
  ngOnInit(): void {
    // Load all products initially
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data; // Initially, show all products
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  // Filter products dynamically based on search query
  onSearchChange(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) || product.ean.includes(query)
    );
  }

    /**
   * Navigates to the product detail page.
   * @param productId - The ID of the selected product.
   */
  // Navigate to Product Detail page
  viewProductDetail(productId: string): void {
    this.router.navigate(['/product/detail', productId]);
  }
}
