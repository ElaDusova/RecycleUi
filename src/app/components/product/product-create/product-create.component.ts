import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductCreate } from '../../../models/product/product-create.interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule,]
})
export class ProductCreateComponent {
  protected product: ProductCreate = {
    name: '',
    ean: '',
    description: '',
    picturePath: null,
  };

  protected errorMessage: string | null = null; // <-- Add this line

  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; // File input reference


  onSubmit(): void {
    this.productService.createProduct(this.product).subscribe({
      next: () => {
        this.errorMessage = null; // Clear error if successful
        this.router.navigate(['/product-search']); // Redirect after success
      },
      error: (error) => {
        console.error('Error creating product:', error);
        this.errorMessage = 'Failed to create product. Please try again.'; // Set error message
      }
    });
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      this.product.picturePath = URL.createObjectURL(file);
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

}
